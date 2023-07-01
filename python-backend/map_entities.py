import random

import genetics
import util
from util import Position
from abc import ABC, abstractmethod  # Abstract Base Class
from typing import Type, Callable
import config_classes


class Entity:
    """
           +--------------+
          /|             /|
         / |            / |
        *--+-----------*  |
        |  |           |  |
        |  |  Entity   |  |
        |  |           |  |
        |  +-----------+--+
        | /            | /
        |/             |/
        *--------------*

    Entity is a base class for any object belonging to the simulation scenario.
    The attributes of the entity are it's position and state. This class also
    allows for calculating distance to other entities. Entities will be responsible
    for decision making, namely they are going to determine which action they want
    to perform. The system will then process those states as series of transactions.

    If the entity becomes inactive, it is removed from it's subsequent list by
    garbage collector
    """

    def __init__(self, position: Position = None):
        self.is_active: bool = True  # TODO make this a status indicator for a garbage collector
        self.position: Type[Position]
        if position is not None:
            self.position = position
        else:
            self.position = util.get_random_map_position()
        self.action_list: list(Callable) = []

    def update_entity(self):
        if self.is_active:
            for action in self.action_list:
                action()

    @abstractmethod
    def run_update_actions(self):
        raise Exception("update_entity is an abstract method!\n"
                        "It should have been implemented for specific entities\n\n")


class Plant(Entity):
    """Plants will create a base of a food chain, and will be a main source
    of influx of energy to the system. The reproduction rate and plant
    growth rate will affect how much energy enters the system"""

    def __init__(self, position: Position = None, stored_energy: int = 100):
        super().__init__(position=position)

        self.stored_energy = stored_energy

    def run_update_actions(self):
        if self.stored_energy < config_classes.PlantSettings.plant_growth_limit:
            self.stored_energy *= config_classes.PlantSettings.plant_growth_rate


class Animal(Entity):
    """
    Animal is a base class for carnivores and omnivores.
    """
    def __init__(self, animal_genotype: genetics.Genotype, position: Position = None, age: float = 0):
        super().__init__(position)
        self.genotype = animal_genotype
        self.phenotype = genetics.Phenotype(genotype=self.genotype)
        self.diet: list[str] = []
        self.action_list.append(self.random_movement)
        self.age = age

    def run_update_actions(self):
        for action in self.action_list:
            action
            # TODO: create update functions for each action

    def random_movement(self):
        self.position.random_movement()

    # self.available_traits = ["Sight", "Speed", "Fertility", "Metabolic rate"]
