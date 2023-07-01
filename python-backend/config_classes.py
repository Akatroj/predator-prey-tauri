from dataclasses import dataclass

position_datatype: type = int

@dataclass
class InitPopConfig:
    n_predators: int = 100
    n_prey: int = 300
    n_grass: int = 900
    n_total = n_prey + n_predators + n_grass
    available_traits = ["Sight", "Speed", "Fertility", "Metabolic rate"]


class PossibleDiets:
    diets: list = ["Carnivore", "Herbivore", "Omnivore"]


@dataclass
class MapSettings:
    map_size_x: position_datatype = 100
    map_size_y: position_datatype = 100


@dataclass
class UISettings:
    # UI SETTINGS
    bg_color = (141, 227, 75)
    grass_color = (19, 138, 39)
    predator_color = (255, 0, 0)
    prey_color = (255, 255, 0)
    UI_ColorPaletteSettings = {"bg_color": bg_color,
                               "grass_color": grass_color,
                               "predator_color": predator_color,
                               "prey_color": prey_color}


class OmnivoreSettings:
    starting_energy: int = 100


class HerbivoreSettings:
    starting_energy: int = 100


class CarnivoreSettings:
    starting_energy: int = 100


class AnimalSettings:
    possible_genes: list[str] = [""]


@dataclass
class PlantSettings:
    plant_growth_rate: float = 1.1  # Affects the energy influx to the system
    plant_growth_limit: float = 200  # Affects the maximum size of plant
    plant_reproduction_rate: float = 1.2
    # Affects chance of spawning another
    # individual when mating


class EntitySettings:
    pass


class Settings:
    """
    This class is going to be a collection of all setting classes,
    and will allow for global setting manipulation
    """

    def __init__(self):
        self.InitPopConfig = InitPopConfig
        self.MapSettings = MapSettings
        self.UISettings = UISettings
