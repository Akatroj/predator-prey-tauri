import { Texture } from '@pixi/core';

import chickenUrl from '@/assets/chicken.png';
import grassUrl from '@/assets/grass.png';
import wolfUrl from '@/assets/wolf.png';
import type { MapEntity } from '@/types';

const chicken = Texture.from(chickenUrl);
const wolf = Texture.from(wolfUrl);
const grass = Texture.from(grassUrl);

export function getTexture(el: MapEntity): Texture {
  switch (el) {
    case '':
      return Texture.EMPTY;
    case 'G':
      return grass;
    case 'K':
      return chicken;
    case 'W':
      return wolf;
  }
}

export function getTintAndVisibility(el: MapEntity): [number, boolean] {
  switch (el) {
    case '':
      return [0xffffff, false];
    case 'G':
      return [0x00ff00, true];
    case 'K':
      return [0xffff00, true];
    case 'W':
      return [0xff0000, true];
  }
}
