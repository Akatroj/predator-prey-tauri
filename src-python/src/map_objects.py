import random
from utilities import Config
from map_informer import MapInformer
import numpy as np


class Entity:
    """
    The entity is a base type of agent in a system.
    Our simulation will have two types of agents:
    -herbivores
    -carnivores
    -possibly omnivores
    The entities will interact with their environment either directly("eating" grass from grass matrix)
    or through MapInformer class which will have methods allowing entity to locate other specimen
    of their species or predators.

    The entities will perform actions in a sequential manner. The order of entity update will be randomized
    for each epoch of simulation. It might be later affected by entity phenotype, for example,
    more agile entities will have priority of movement.

    Each entity will have a list of actions which it will attempt to perform. The actions will start
    with the actions of higher needs(such as mating), and end with actions ensuring the entity survival
    (such as running away from predators, or eating)

    The number of actions
    """

    def __init__(self, map_informer: MapInformer, global_config, sim_ref, entity_name="template",
                 starting_energy=1000, max_energy=1000,
                 diet="", generation=0):

        # Entity position on a map. By default initialized as random.
        self.GlobalConfig = global_config
        self.map_informer = map_informer
        self.sim_ref = sim_ref
        self.position_x = random.randint(0, self.GlobalConfig.map_max_index_x)
        self.position_y = random.randint(0, self.GlobalConfig.map_max_index_y)
        self.name = entity_name
        self.actions_to_perform = []
        self.actions_to_perform.append(FindFood(self))
        self.actions_to_perform.append(RandomMovement(self))
        self.energy = starting_energy
        self.max_energy = max_energy
        self.maslov_pyramid = {'Physiological': 0, 'Safety': 1, 'Mating': 2}  # lower number == higher priority

        self.thresholds = {'Physiological': max_energy * 0.5, 'Safety': max_energy * 0.7, 'Mating': max_energy * 0.9}

        self.diet = diet
        self.generation = generation

        self.phenotype = {"grass_find_range": 5, "random_movement_range": 4, "grass_consumption_energy_gain": 100,
                          "animal_consumption_energy_gain": 250}

        self.possible_actions_per_epoch = 1
        self.max_actions_per_epoch = 1

        self.next_position_x = self.position_x
        self.next_position_y = self.position_y

    def update_entity(self):
        while self.possible_actions_per_epoch > 0:  # perform actions until no more actions can be performed
            for action in self.actions_to_perform:
                if self.possible_actions_per_epoch > 0:
                    action.update_action()  # move entity to the desired position
                else:
                    break

    def move_entity(self):
        self.position_x = self.next_position_x
        self.position_y = self.next_position_y
        self.energy -= 10

    def eat_grass(self):
        self.energy += self.phenotype["grass_consumption_energy_gain"]
        # grass_matrix = self.map_informer.get_grass_ref()
        if self.energy > self.max_energy:
            self.energy = self.max_energy
        self.sim_ref.grass_matrix[self.position_x, self.position_y] = 0
        print(np.sum(self.sim_ref.grass_matrix))

    def eat_other_entity(self):
        self.energy += self.phenotype["grass_consumption_energy_gain"]
        # grass_matrix = self.map_informer.get_grass_ref()
        if self.energy > self.max_energy:
            self.energy = self.max_energy
        self.sim_ref.grass_matrix[self.position_x, self.position_y] = 0
        print(np.sum(self.sim_ref.grass_matrix))

    def update_for_next_epoch(self):
        self.possible_actions_per_epoch = self.max_actions_per_epoch


class MovementGene:
    def __init__(self):
        self.Allele_1 = 5
        self.Allele_2 = 5


class Allele:
    def __init__(self):
        self.Value = 5

    def mutate(self, mutation_chance=0.01):
        if random.random() < mutation_chance:
            mutation_rate = 1.1
            self.Value = self.Value * mutation_rate


class Action:
    """
    Action will determine the behaviour of the entity. The actions in the action list
    are ordered according to their priority(highest priority at the end). Then the actions
    are evaluated according to the list(more important action overwrites the less important
    ones, should it be activated).
    Example: if the animal's energy is above a threshold value, it will try to mate/multiply
    """

    def __init__(self, parent_entity: Entity):
        self.update_function()
        self.parent_entity = parent_entity
        # self.perform_action = False
        # self.parent_entity.next_position_x = parent_entity.position_x
        # self.parent_entity.next_position_y = parent_entity.position_y

    def update_function(self):
        pass


class RandomMovement(Action):
    def __init__(self, parent_entity: Entity):
        Action.__init__(self, parent_entity)

    def update_action(self):

        movement_range = self.parent_entity.phenotype["random_movement_range"]

        self.parent_entity.next_position_x = self.parent_entity.position_x + random.randint(-movement_range,
                                                                                            movement_range)
        if self.parent_entity.next_position_x < 0:
            self.parent_entity.next_position_x = 0
        if self.parent_entity.next_position_x > self.parent_entity.GlobalConfig.map_max_index_x:
            self.parent_entity.next_position_x = self.parent_entity.GlobalConfig.map_max_index_x
        self.parent_entity.next_position_y = self.parent_entity.position_y + random.randint(-movement_range,
                                                                                            movement_range)
        if self.parent_entity.next_position_y < 0:
            self.parent_entity.next_position_y = 0
        if self.parent_entity.next_position_y > self.parent_entity.GlobalConfig.map_max_index_y:
            self.parent_entity.next_position_y = self.parent_entity.GlobalConfig.map_max_index_y

        self.parent_entity.move_entity()
        self.parent_entity.possible_actions_per_epoch -= 1


class RunAwayFromPredator(Action):
    def __init__(self, parent_entity):
        Action.__init__(self, parent_entity)

    def update_action(self):
        if self.parent_entity.diet == "herbivore":
            self.parent_entity.find_nearest_predator()


class FindFood(Action):
    def __init__(self, parent_entity):
        Action.__init__(self, parent_entity)

    def update_action(self):
        if self.parent_entity.diet == "herbivore":
            self.find_nearest_grass()

    def find_nearest_grass(self):
        x_pos = self.parent_entity.position_x
        y_pos = self.parent_entity.position_y
        search_range_x = range(int(x_pos - self.parent_entity.phenotype["grass_find_range"]),
                               int(x_pos + self.parent_entity.phenotype["grass_find_range"]),
                               1)

        search_range_y = range(int(y_pos - self.parent_entity.phenotype["grass_find_range"]),
                               int(y_pos + self.parent_entity.phenotype["grass_find_range"]),
                               1)

        search_range_x = [position for position in search_range_x
                          if 0 <= position < self.parent_entity.GlobalConfig.map_max_index_x]
        search_range_y = [position for position in search_range_y
                          if 0 <= position < self.parent_entity.GlobalConfig.map_max_index_y]
        closest_grass_x = -1
        closest_grass_y = -1
        for x_cord in search_range_x:
            for y_cord in search_range_y:
                if self.parent_entity.map_informer.check_grass_grid(x_cord, y_cord):
                    if abs(closest_grass_x - x_pos) > abs(x_cord - x_pos) \
                            and abs(closest_grass_y - y_pos) > abs(y_cord - y_pos):
                        closest_grass_x = x_cord
                        closest_grass_y = y_cord
        if closest_grass_x > 0:
            self.parent_entity.next_position_x = closest_grass_x
            self.parent_entity.next_position_y = closest_grass_y
            self.parent_entity.possible_actions_per_epoch -= 1  # The action has been performed
            self.parent_entity.move_entity()
            self.parent_entity.eat_grass()
