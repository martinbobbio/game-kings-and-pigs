import { Point, Texture } from 'pixi.js';
import { Animation, Block } from '..';

export interface DoorState {
  type: 'prev' | 'next';
  position: Point;
  hitbox: Block;
  currentAnimation: Animation;
  animations: DoorAnimations;
  open: () => void;
  idle: () => void;
  close: () => void;
}

export interface DoorAnimations {
  idle: Animation;
  opening: Animation;
  closing: Animation;
}

export interface DoorTextures {
  idle: Texture;
  opening: Texture;
  closing: Texture;
}
