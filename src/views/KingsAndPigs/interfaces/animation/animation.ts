import { Texture } from 'pixi.js';

export interface Animation {
  texture: Texture;
  loop: boolean;
  autoplay: boolean;
  frameBuffer: number;
  frameRate: number;
  invertedTile?: boolean;
  nPosition?: number;
  onComplete?: () => void;
}
