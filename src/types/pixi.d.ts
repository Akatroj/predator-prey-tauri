import '@pixi/display';

declare module '@pixi/display' {
  interface DisplayObject {
    name: string; // for pixi devtools
  }
}
