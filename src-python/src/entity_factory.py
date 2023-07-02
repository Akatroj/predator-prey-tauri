import map_objects
import random
from utilities import Config
from map_objects import Entity
import sys


class EntityGenerator:
    """
    This class will be initialized using simulation class once per simulation
    to be able to quickly rerun the simulation from the same initial state using
    different new starting variables.
    """

    def __init__(self, global_config: Config):
        self.GlobalConfig = global_config
        self.entity_gen_seed = self.GlobalConfig.entity_gen_seed
        self.n_prey = Config().starting_prey
        self.n_predators = Config().starting_predators
        print(f"Generating entities using seed: {self.entity_gen_seed}")
        random.seed(self.entity_gen_seed)

        self.starting_prey = []
        self.starting_predators = []

        self.initialize_prey()
        self.initialize_predators()

    def initialize_prey(self):  # initialize with empty references to simulation
        for i in range(self.n_prey):
            self.starting_prey.append(Entity(entity_name=f"Prey_generation_{i}", diet="herbivore"
                                             , map_informer=None, sim_ref=None, global_config=self.GlobalConfig))

    def initialize_predators(self): # initialize with empty references to simulation
        for i in range(self.n_predators):
            self.starting_predators.append(Entity(entity_name=f"Predator_generation_{i}", diet="carnivore"
                                                  , map_informer=None, sim_ref=None, global_config=self.GlobalConfig))

    def restart_simulation(self):
        self.__init__(entity_gen_seed=self.entity_gen_seed)
        # to restart simulation, reinitialize the list
