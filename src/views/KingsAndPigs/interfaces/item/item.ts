import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface ItemState {
  animation: Animation;
  hitbox: Block;
  position: Point;
}

export interface ItemAnimations {
  diamond: Animation;
  heart: Animation;
}

export interface ItemTextures {
  diamond: Texture;
  heart: Texture;
}
