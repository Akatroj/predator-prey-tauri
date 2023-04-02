import time
import simulation_class as sim
from entity_factory import EntityGenerator
from utilities import Config

GlobalConfig = Config(entity_gen_seed=222)

entity_generator, simulation = None, None


def init_simulation(config=GlobalConfig):
    global entity_generator, simulation
    entity_generator = EntityGenerator(global_config=GlobalConfig)
    simulation = sim.SimulationClass(entity_generator, global_config=GlobalConfig)
    simulation.initialize_simulation(
        grass_coverage=25, predator_count=20, prey_count=200
    )  # grass coverage [%]


def next_step():
    simulation.update_simulation()
    return simulation.get_frame()


def main():
    init_simulation()
    import pygame_frontend as front

    front_end = front.FrontEnd(simulation)

    while True:
        simulation.update()
        front_end.update_screen()
        time.sleep(0.1)


if __name__ == "__main__":
    main()
