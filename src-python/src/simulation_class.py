import numpy as np
import random
from utilities import Config
from map_objects import Entity
from map_informer import MapInformer
from entity_factory import EntityGenerator
import json


class SimulationClass:
    """
    One step is equal to around 0.1s
    """

    def __init__(self, entity_generator: EntityGenerator, global_config: Config):
        self.GlobalConfig = global_config
        self.current_step = 0
        self.delta_t = 0.1  # [s]
        self.map_size_x = self.GlobalConfig.map_size_x  # tiles
        self.map_size_y = self.GlobalConfig.map_size_y  # tiles
        self.grass_matrix = np.zeros(shape=(self.map_size_x, self.map_size_y))
        self.simulation_config = self.GlobalConfig

        self.map_informer = MapInformer(sim_class_ref=self)
        self.entity_generator = entity_generator

        self.prey_list = entity_generator.starting_prey.copy()
        self.predator_list = entity_generator.starting_predators.copy()

        for predator in self.predator_list:
            predator.map_informer = self.map_informer
            predator.sim_ref = self

        for prey in self.prey_list:
            prey.map_informer = self.map_informer
            prey.sim_ref = self

        self.entity_list = [self.prey_list, self.predator_list]

    def initialize_simulation(
        self, grass_coverage=20, predator_count=20, prey_count=100
    ):
        self.generate_new_grass(grass_per_cent_per_row=grass_coverage)
        # self.generate_new_predators(predator_count=predator_count)
        # self.generate_new_prey(prey_count=prey_count)

    def get_grass_matrix(self):
        return self.grass_matrix

    def generate_new_grass(self, grass_per_cent_per_row=20):
        for i in range(self.map_size_x):
            grass_x = random.sample(
                range(0, self.map_size_x),
                int(grass_per_cent_per_row * (self.map_size_y / 100)),
            )
            for x in grass_x:
                self.grass_matrix[x, i] = 1

    def generate_new_predators(self, predator_count=20):
        for i in range(predator_count):
            self.predator_list.append(
                Entity(map_informer=self.map_informer, entity_name="predator")
            )

    def generate_new_prey(self, prey_count=20):
        for i in range(prey_count):
            self.prey_list.append(
                Entity(map_informer=self.map_informer, entity_name="prey")
            )

    def update_simulation(self):
        # !TODO predator first, prey_second, then grass
        print(f"Current step: {self.current_step}")
        [
            prey.update_entity() for prey in self.prey_list
        ]  # let entities perform actions
        random.shuffle(self.prey_list)  # shuffle before next step
        [
            prey.update_for_next_epoch() for prey in self.prey_list
        ]  # get prey ready for next step
        self.prey_list = [
            prey for prey in self.prey_list if prey.energy > 0
        ]  # death by starvation

        [
            predator.update_entity() for predator in self.predator_list
        ]  # let entities perform actions
        random.shuffle(self.predator_list)  # shuffle before next step
        [
            predator.update_for_next_epoch() for predator in self.predator_list
        ]  # get prey ready for next step
        self.predator_list = [
            predator for predator in self.predator_list if predator.energy > 0
        ]  # death by starvation
        print(f"Total amount of energy in prey:     {sum([prey.energy for prey in self.prey_list])}")
        print(f"Total amount of energy in predators:{sum([predator.energy for predator in self.predator_list])}\n")

        self.generate_new_grass(grass_per_cent_per_row=1)
        self.current_step += 1

    def build_frame(self):
        data = [
            [""] * self.GlobalConfig.map_size_y
            for _ in range(self.GlobalConfig.map_size_x)
        ]
        grass, predators, preys = 0, 0, 0

        for y, row in enumerate(self.grass_matrix):
            for x, el in enumerate(row):
                if el == 1:
                    data[y][x] = "Grass"
                    grass += 1

        for predator in self.predator_list:
            data[predator.position_y][predator.position_x] = "Predator"
            predators += 1

        for prey in self.prey_list:
            data[prey.position_y][prey.position_x] = "Prey"
            preys += 1

        return list(data), [grass, predators, preys], self.current_step

    def get_frame(self):
        return self.build_frame()
