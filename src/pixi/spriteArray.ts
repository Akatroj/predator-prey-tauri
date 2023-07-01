import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';

import type { SpriteArray } from '@/types';
import { DEFAULT_MAP_SIZE, DEFAULT_STAGE_SIZE, forEach2D, init2DArray } from '@/utils';

type ReturnValue = {
  spriteArr: SpriteArray;
  cleanupSprites: () => void;
};

export function initializeSpriteArray(
  stageSize = DEFAULT_STAGE_SIZE,
  mapSize = DEFAULT_MAP_SIZE,
): ReturnValue {
  console.log('init');
  const spriteSize = Math.floor(stageSize / mapSize);

  const spriteArr = init2DArray<Sprite>(mapSize, (x, y) => {
    const sprite = new Sprite(Texture.WHITE);
    sprite.width = spriteSize;
    sprite.height = spriteSize;
    sprite.x = x * spriteSize;
    sprite.y = y * spriteSize;
    sprite.tint = 0xffffff;

    return sprite;
  });

  const cleanupSprites = () =>
    forEach2D(spriteArr, sprite => {
      sprite.destroy();
    });

  return { spriteArr, cleanupSprites };
}
