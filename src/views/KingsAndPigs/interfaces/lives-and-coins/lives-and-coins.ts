import { Texture } from 'pixi.js';
import { Animation } from '..';

export interface LivesAndCoinsAnimations {
  liveBar: Animation;
  heart: Animation;
  diamond: Animation;
  numbers: Animation;
}

export interface LivesAndCoinsTextures {
  liveBar: Texture;
  heart: Texture;
  diamond: Texture;
  numbers: Texture;
}
