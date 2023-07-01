from config_classes import Settings, InitPopConfig
import uuid
import random
from map_entities import Plant, Animal
from genetics import GenotypeConstructor


class SimulationClassV2:
    def __init__(self, seed: int=None):
        if seed is not None:
            random.seed(seed)
        print("Creating new simulation class object")
        print_progress = lambda operation: print("\rOperation:{}/{}".format(operation, InitPopConfig.n_total))
        current_step = 0
        print("Initializing population:")
        self.simulation_settings = Settings
        self.grass_list = self.plant_generator(n_plants=InitPopConfig.n_grass)
        self.prey_list = self.animal_generator(n_animals=InitPopConfig.n_prey)
        self.predator_list = []  # TODO add predators to the system, and implement their behavior
        self.animal_list = list(self.prey_list) + self.predator_list
        self.sim_uuid = uuid.uuid4().hex

    def update_animal_list(self):
        self.animal_list.sort(key=lambda x: x.attribute["Speed"])
        [animal.update_entity() for animal in self.animal_list]

    @staticmethod
    def animal_generator(n_animals):  # TODO: add carnivore diet
        num = 0
        while num < n_animals:
            animal = Animal(GenotypeConstructor.initialize_new_animal_genotype())
            animal.diet = ["Herbivore"]
            yield animal
            num += 1

    @staticmethod
    def plant_generator(n_plants):
        num = 0
        while num < n_plants:
            yield Plant()
            num += 1
