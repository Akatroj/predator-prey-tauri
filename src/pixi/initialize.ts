import '@pixi/events'; // side-effect import, adds EventSystem to Application

import { Application } from '@pixi/app';
import { Viewport } from 'pixi-viewport';

import { BACKGROUND_COLOR, DEFAULT_STAGE_SIZE, MAX_ZOOM, MIN_ZOOM } from '@/utils';

export const { app, viewport } = initializePixijs();

function initializePixijs() {
  const app = new Application<HTMLCanvasElement>({
    width: DEFAULT_STAGE_SIZE,
    height: DEFAULT_STAGE_SIZE,
    backgroundColor: BACKGROUND_COLOR,
  });

  const viewport = initializeViewport(app);

  app.stage.addChild(viewport);

  // pixijs devtools support
  globalThis.__PIXI_APP__ = app;

  // https://github.com/davidfig/pixi-viewport/issues/269
  app.renderer.runners['destroy'].add({
    destroy: viewport.destroy.bind(viewport),
  });

  return { app, viewport };
}

function initializeViewport(app: Application) {
  const viewport = new Viewport({
    worldWidth: DEFAULT_STAGE_SIZE,
    worldHeight: DEFAULT_STAGE_SIZE,
    screenHeight: DEFAULT_STAGE_SIZE,
    screenWidth: DEFAULT_STAGE_SIZE,
    events: app.renderer.events,
  });

  viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()
    .clampZoom({ minScale: MIN_ZOOM, maxScale: MAX_ZOOM })
    .clamp({ direction: 'all' });

  viewport.name = 'Viewport';

  return viewport;
}
