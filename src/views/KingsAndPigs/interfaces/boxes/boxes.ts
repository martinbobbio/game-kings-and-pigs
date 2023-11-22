import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface BoxState {
  position: Point;
  velocity: Point;
  hitbox: Block;
  behavior: BoxBehaviors;
}

export type BoxBehaviors = 'IDLE' | 'HIT' | 'BROKEN' | 'EXTINCTED';

export interface BoxAnimations {
  idle: Animation;
  hit: Animation;
}

export interface BoxTextures {
  idle: Texture;
  hit: Texture;
  broken1: Texture;
  broken2: Texture;
  broken3: Texture;
  broken4: Texture;
}
