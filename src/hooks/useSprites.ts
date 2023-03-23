import type { Application } from '@pixi/app';
import type { Viewport } from 'pixi-viewport';
import { useEffect } from 'react';

import type { SpriteArray } from '@/types';
import { forEach2D } from '@/utils';

import { app, viewport } from '../pixi/initialize';
import { initializeSpriteArray } from '../pixi/spriteArray';
import { useStateWithRef } from './useStateWithRef';

type Props = {
  app?: Application;
  viewport?: Viewport;
  mapSize?: number;
};

export function useSprites({ mapSize }: Props) {
  const [spriteArr, spriteArrRef, setSpriteArr] = useStateWithRef<SpriteArray>();

  useEffect(() => {
    const stageSize = app.view.width;
    const { spriteArr, cleanupSprites } = initializeSpriteArray(stageSize, mapSize);
    forEach2D(spriteArr, sprite => viewport.addChild(sprite));

    setSpriteArr(spriteArr);

    return () => {
      setSpriteArr(undefined);
      cleanupSprites();
      viewport.removeChildren();
    };
  }, [app, viewport, mapSize]);

  return {
    spriteArr,
    spriteArrRef,
  };
}
