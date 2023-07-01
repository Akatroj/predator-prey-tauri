import pygame
import simulation_class
import numpy as np
import time
import sys
from utilities import Config

pygame.init()


class FrontEnd:
    def __init__(self, sim_ref):
        self.simulation = sim_ref
        self.config = self.simulation.simulation_config
        self.screen_x = 1000
        self.screen_y = 1000
        # Set up the drawing window
        self.screen = pygame.display.set_mode([1000, 1000])

        pygame.display.set_caption('Predator prey simulation')
        # Fill the background with green
        self.screen.fill((141, 227, 75))

    def update_background(self):
        self.screen.fill(self.config.bg_color)

    def update_grass(self):
        grass_matrix = self.simulation.grass_matrix
        # print(np.sum(grass_matrix))
        i, j = np.where(grass_matrix == 1)
        for k in range(len(i)):
            pygame.draw.rect(self.screen, self.config.grass_color,
                             [i[k] * self.config.cell_size, j[k] * self.config.cell_size,
                              self.config.cell_size, self.config.cell_size])

    def update_predators(self):
        for predator in self.simulation.predator_list:
            pygame.draw.rect(self.screen, self.config.predator_color,
                             [predator.position_x * self.config.cell_size,
                              predator.position_y * self.config.cell_size,
                              self.config.cell_size,
                              self.config.cell_size])

    def update_prey(self):
        for prey in self.simulation.prey_list:
            pygame.draw.rect(self.screen, self.config.prey_color,
                             [prey.position_x * self.config.cell_size,
                              prey.position_y * self.config.cell_size,
                              self.config.cell_size,
                              self.config.cell_size])

    def update_screen(self):
        self.update_background()
        self.update_grass()
        self.update_predators()
        self.update_prey()
        pygame.display.flip()

    def handle_event(self, event: pygame.event):
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    def update(self):
        for event in pygame.event.get():
            self.handle_event(event)
        self.update_screen()
