from config_classes import Settings
from config_classes import Settings
import uuid


class SimulationClassV2:
    def __init__(self):
        print("Creating new simulation class object")
        self.current_step = 0
        self.simulation_settings = Settings
        self.grass_list = []
        self.animal_list = []
        self.uuid = uuid.uuid4().hex

    def update_animal_list(self):
        self.animal_list.sort(key=lambda x: x.attribute["Speed"])
