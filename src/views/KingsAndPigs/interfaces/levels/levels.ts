import { Point, Texture } from 'pixi.js';
import { Block } from '..';

export interface LevelKingAndPigs {
  current: number;
  texture: Texture | null;
  collisionBlocks: Block[];
  platformBlocks: Block[];
  boxes?: Block[];
  decorations?: DecorationsLevel;
  initialPosition: Point;
  doors: LevelDoor[];
  player: {
    position: Point;
    attackHitbox?: Block;
  };
  items?: {
    diamonds?: Block[];
  };
  stats: {
    diamonds: number;
    timer: number;
    lives: number;
  };
  onNextLevel: () => void;
  deleteDiamond: (id: number) => void;
  updatePlayerPosition: (point: Point) => void;
  updatePlayerAttakHitbox: (block?: Block) => void;
  updateDiamonds: (diamonds: number) => void;
  updateLives: (lives: number) => void;
}

export interface DecorationsLevel {
  candles?: Block[];
  smallChains?: Block[];
  bigChains?: Block[];
  windows?: Block[];
}

export interface LevelDoor {
  type: 'next' | 'prev';
  block: Block;
}

export interface LevelData {
  width: number;
  height: number;
  layers: LayerPrimary[];
}

export interface LayerPrimary {
  id: number;
  opacity: number;
  name: string;
  type: string;
  visible: boolean;
  x: number;
  y: number;
  layers: LayerSecondary[];
}

export interface LayerSecondary {
  data: number[];
  id: number;
  opacity: number;
  name: string;
  type: string;
  visible: boolean;
  x: number;
  y: number;
  offsetx?: number;
  offsety?: number;
}
