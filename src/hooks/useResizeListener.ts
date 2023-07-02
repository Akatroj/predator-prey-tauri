import type { Application } from '@pixi/app';
import { debounce } from 'lodash-es';
import type { Viewport } from 'pixi-viewport';
import { useEffect } from 'react';

import type { SpriteArray } from '@/types';
import { forEach2D } from '@/utils';

type Listeners = {
  app: Application;
  viewport: Viewport;
  spriteArr: SpriteArray;
};

export function useResizeListeners<T extends HTMLElement>(
  target: T | null,
  mapSize: number,
  { spriteArr, app, viewport }: Listeners,
) {
  useEffect(() => {
    if (!target || !spriteArr) return;

    const resizeSprites = (spriteArr: SpriteArray, newSize: number) => {
      forEach2D(spriteArr, (sprite, x, y) => {
        sprite.width = newSize;
        sprite.height = newSize;
        sprite.x = x * newSize;
        sprite.y = y * newSize;
      });
    };

    const callback = debounce(() => {
      const newCanvasWidth = document.body.clientWidth / 2;
      const newCanvasHeight = document.body.clientHeight / 2;
      app.renderer.resize(newCanvasWidth, newCanvasHeight);

      const newSpriteSize = Math.ceil(Math.min(newCanvasWidth, newCanvasHeight) / mapSize);
      const newWorldSize = newSpriteSize * mapSize;

      viewport.resize(newCanvasWidth, newCanvasHeight, newWorldSize, newWorldSize);
      resizeSprites(spriteArr, newSpriteSize);
    });

    window.addEventListener('resize', callback);

    setTimeout(callback, 0);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [target, spriteArr, mapSize, app.renderer, viewport]);
}
