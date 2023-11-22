import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface DecorationsState {
  animation: Animation;
  hitbox: Block;
  position: Point;
  scale?: number;
}

export interface DecorationsAnimations {
  candle: Animation;
  candleLight: Animation;
  smallChain: Animation;
  bigChain: Animation;
  window: Animation;
  windowLight: Animation;
}

export interface DecorationsTextures {
  candle: Texture;
  candleLight: Texture;
  smallChain: Texture;
  bigChain: Texture;
  window: Texture;
  windowLight: Texture;
}
