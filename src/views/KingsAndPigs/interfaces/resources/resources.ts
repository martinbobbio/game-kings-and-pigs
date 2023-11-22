import { Sound } from '@pixi/sound';
import {
  BoxTextures,
  DecorationsTextures,
  DialogBoxTextures,
  DoorTextures,
  ItemTextures,
  LivesAndCoinsTextures,
  ParticlesTextures,
  PlayerTextures,
} from '..';

export interface TexturesKingsAndPigs {
  king: PlayerTextures;
  door: DoorTextures;
  dialogBox: DialogBoxTextures;
  livesAndCoins: LivesAndCoinsTextures;
  decorations: DecorationsTextures;
  particles: ParticlesTextures;
  item: ItemTextures;
  box: BoxTextures;
}

export interface SoundsKingsAndPigs {
  music: Sound;
  sword: Sound;
  walk: Sound;
  jump: Sound;
  doorIn: Sound;
  doorOut: Sound;
  diamond: Sound;
  fall: Sound;
  run: Sound;
  boxBreak: Sound;
}
