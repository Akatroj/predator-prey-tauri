import type { Sprite } from '@pixi/sprite';

export type MapEntity = '' | 'Grass' | 'Predator' | 'Prey';

export type SimulationMap = MapEntity[][];

export type SpriteArray = Sprite[][];
