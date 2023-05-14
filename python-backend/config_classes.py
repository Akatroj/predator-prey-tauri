from dataclasses import dataclass
position_datatype: type = int



class InitPopConfig:
    def __init__(self):
        self.n_predators = 100
        self.n_prey = 300
        self.n_grass = 900
        self.available_traits = ["Sight", "Speed", "Fertility", "Metabolic rate"]


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
    pass


class HerbivoreSettings:
    pass


class CarnivoreSettings:
    pass


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
