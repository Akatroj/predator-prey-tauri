import random


class Config:
    def __init__(self, entity_gen_seed=None) -> object:
        self.delta_t = 1  # [s]
        self.SimulationTimeSettings = {"delta_t": self.delta_t}

        self.starting_prey = 100
        self.starting_predators = 10

        self.cell_size = 10
        self.map_size_x = 200
        self.map_size_y = 200
        self.map_max_index_x = self.map_size_x - 1
        self.map_max_index_y = self.map_size_y - 1
        self.SimulationMapSettings = {
            "cell_size": self.cell_size,
            "map_size_x": self.map_size_x,
            "map_size_y": self.map_size_y,
        }

        self.bg_color = (141, 227, 75)
        self.grass_color = (19, 138, 39)
        self.predator_color = (255, 0, 0)
        self.prey_color = (255, 255, 0)
        self.UI_ColorPaletteSettings = {
            "bg_color": self.bg_color,
            "grass_color": self.grass_color,
            "predator_color": self.predator_color,
            "prey_color": self.prey_color,
        }
        self.max_seed_value = 2048

        if entity_gen_seed is None:
            self.entity_gen_seed = random.randint(1, self.max_seed_value)
            print(f"Using random seed: {self.entity_gen_seed}")
        else:
            self.entity_gen_seed = entity_gen_seed
            print(f"Using provided seed: {self.entity_gen_seed}")

        self.EntityFactorySettings = {"entity_gen_seed": self.entity_gen_seed}

        self.entity_settings = {
            "predator_energy_movement": int(50),
            "prey_energy_movement": int(50),
        }
