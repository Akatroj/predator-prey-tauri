import type { Sprite } from '@pixi/sprite';

export type MapEntity = '' | 'Grass' | 'Predator' | 'Prey';

export type SimulationMap = MapEntity[][];

export type SpriteArray = Sprite[][];

export type Config = {
  starting_prey: number;
  starting_predator: number;
  // graphic only?
  cell_size: number;
  map_size_x: number;
  map_size_y: number;
  map_max_index_x: number; // map_size_x-1
  map_max_index_y: number; // map_size_y-1
  bg_color: [number, number, number];
  grass_color: [number, number, number];
  predator_color: [number, number, number];
  prey_color: [number, number, number];
  // sneed
  max_seed_value: number;
  entity_gen_seed: number;
};
