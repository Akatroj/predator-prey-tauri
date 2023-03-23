import type { RefObject} from 'react';
import { useEffect } from 'react';

import type { SimulationMap } from '@/types';

import { app, viewport } from '../pixi/initialize';
import { onZoom, render } from '../pixi/render';
import { useResizeListeners } from './useResizeListener';
import { useSprites } from './useSprites';

export function useRenderOnCanvas(
  parent: HTMLElement | null,
  mapRef: RefObject<SimulationMap | undefined>,
  mapSize: number,
) {
  const { spriteArr, spriteArrRef } = useSprites({
    app,
    viewport,
    mapSize,
  });

  useEffect(() => {
    if (!parent) return;
    parent.appendChild(app.view);

    return () => {
      parent.removeChild(app.view);
    };
  }, [app, parent]);

  // @ts-expect-error TODO:
  useResizeListeners(parent, mapSize, { app, viewport, spriteArr });

  useEffect(() => {
    const callback = () => {
      onZoom(viewport.scaled);
    };

    viewport.on('zoomed-end', callback);

    return () => {
      viewport.off('zoomed-end', callback);
    };
  }, [viewport, app]);

  useEffect(() => {
    const callback = () => {
      if (!mapRef.current || !spriteArrRef.current) return;
      render(mapRef.current, spriteArrRef.current);
    };

    app.ticker.add(callback);

    return () => {
      app.ticker?.remove(callback);
    };
  }, [app]);
}
