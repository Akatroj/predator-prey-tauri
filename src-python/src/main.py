import time
import simulation_class as sim
import pygame_frontend as front
from entity_factory import EntityGenerator
from utilities import Config

GlobalConfig = Config(entity_gen_seed=222)


def main():
    entity_generator = EntityGenerator(global_config=GlobalConfig)
    simulation = sim.SimulationClass(entity_generator, global_config=GlobalConfig)
    simulation.initialize_simulation(grass_coverage=25, predator_count=20, prey_count=200)  # grass coverage [%]

    front_end = front.FrontEnd(simulation)

    while True:
        simulation.update_simulation()
        front_end.update_screen()
        time.sleep(0.1)


if __name__ == '__main__':
    main()
