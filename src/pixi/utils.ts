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
    case 'Grass':
      return grass;
    case 'Prey':
      return chicken;
    case 'Predator':
      return wolf;
  }
}

export function getTintAndVisibility(el: MapEntity): [number, boolean] {
  switch (el) {
    case '':
      return [0xffffff, false];
    case 'Grass':
      return [0x00ff00, true];
    case 'Prey':
      return [0xffff00, true];
    case 'Predator':
      return [0xff0000, true];
  }
}
