import { Texture } from 'pixi.js';
import { Animation } from '..';

export interface DialogBoxState {
  dialog?: Dialog;
  addDialog: (key: keyof DialogBoxAnimations) => void;
  deleteDialog: () => void;
}

export interface Dialog {
  currentAnimation: Animation;
}

export interface DialogBoxAnimations {
  hello: Animation;
  exclamation: Animation;
  dead: Animation;
}

export interface DialogBoxTextures {
  hello: Texture;
  exclamation: Texture;
  dead: Texture;
}
