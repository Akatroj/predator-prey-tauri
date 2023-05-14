from config_classes import MapSettings, position_datatype
from typing import Type
import random
import numpy as np
from genetics import Genotype, Phenotype, Gene, Allele


class Position:
    """Position"""
    def __init__(self, x: position_datatype, y:position_datatype):
        position_type = position_datatype
        self.X = position_type(x)
        self.Y = position_type(y)
        self.coordinates = np.array([self.X, self.Y])

    def get_distance_to(self, x: position_datatype, y: position_datatype):
        return np.linalg.norm(np.array([x, y]) - self.coordinates)


def get_random_map_position() -> Position:

    if position_datatype is int:
        return Position(random.randint(0, MapSettings.map_size_x), random.randint(0, MapSettings.map_size_y))
    elif position_datatype is float:
        return Position(float(random.random() * MapSettings().map_size_x),
                        float(random.random() * MapSettings().map_size_y))
    else:
        raise TypeError