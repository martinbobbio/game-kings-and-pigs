import { Point, Texture } from 'pixi.js';
import { Animation } from '..';

export interface ParticlesState {
  items: Particle[];
  addParticle: (
    key: keyof ParticlesAnimations,
    point: Point,
    inverted: boolean
  ) => void;
}

export interface Particle {
  currentAnimation: Animation;
  inverted: boolean;
  position: Point;
}

export interface ParticlesAnimations {
  fall: Animation;
  jump: Animation;
  run: Animation;
  diamond: Animation;
  disappearing: Animation;
}

export interface ParticlesTextures {
  fall: Texture;
  jump: Texture;
  run: Texture;
  diamond: Texture;
  disappearing: Texture;
}
