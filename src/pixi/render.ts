import { Texture } from '@pixi/core';

import type { SimulationMap, SpriteArray } from '@/types';
import { DETAILED_SPRITES_ZOOM_THRESHOLD, forEach2D } from '@/utils';

import { getTexture, getTintAndVisibility } from './utils';

export enum RenderingMode {
  SMALL,
  DETAILED,
}

let renderingMode = RenderingMode.SMALL;

export const onZoom = (currentZoom: number) => {
  if (currentZoom >= DETAILED_SPRITES_ZOOM_THRESHOLD) renderingMode = RenderingMode.DETAILED;
  else renderingMode = RenderingMode.SMALL;
};

const updateDetailedSprites = (map: SimulationMap, spriteArr: SpriteArray) => {
  forEach2D(spriteArr, (el, x, y) => {
    el.tint = 0xffffff; // remove tint
    el.texture = getTexture(map[y][x]);
    el.visible = true;
  });
};

const updateSmallSprites = (map: SimulationMap, spriteArr: SpriteArray) => {
  forEach2D(spriteArr, (el, x, y) => {
    el.texture = Texture.WHITE;
    const [tint, visible] = getTintAndVisibility(map[y][x]);
    el.tint = tint;
    el.visible = visible;
  });
};

export function render(map: SimulationMap, spriteArr: SpriteArray) {
  if (renderingMode === RenderingMode.DETAILED) updateDetailedSprites(map, spriteArr);
  else updateSmallSprites(map, spriteArr);
}
