import { useEffect, useState } from 'react';
import { SoundsKingsAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { Assets } from 'pixi.js';
import { Sound } from '@pixi/sound';

interface TexturePaths {
  [key: string]: {
    [key: string]: string;
  };
}

interface SoundPaths {
  [key: string]: string;
}

const uri = '../sprites/';
const texturePaths: TexturePaths = {
  king: {
    idle: `${uri}king/idle.png`,
    run: `${uri}king/run.png`,
    attack: `${uri}king/attack.png`,
    doorIn: `${uri}king/door-in.png`,
    doorOut: `${uri}king/door-out.png`,
    dead: `${uri}king/dead.png`,
    hit: `${uri}king/hit.png`,
    fall: `${uri}king/fall.png`,
  },
  door: {
    idle: `${uri}door/idle.png`,
    opening: `${uri}door/opening.png`,
    closing: `${uri}door/closing.png`,
  },
  dialogBox: {
    hello: `${uri}dialogue-boxes/hello.png`,
    exclamation: `${uri}dialogue-boxes/exclamation.png`,
    dead: `${uri}dialogue-boxes/dead.png`,
  },
  livesAndCoins: {
    liveBar: `${uri}lives-and-coins/live-bar.png`,
    numbers: `${uri}lives-and-coins/numbers.png`,
    heart: `${uri}lives-and-coins/heart.png`,
    diamond: `${uri}lives-and-coins/diamond.png`,
  },
  decorations: {
    candle: `${uri}decorations/candle.png`,
    candleLight: `${uri}decorations/candle-light.png`,
    smallChain: `${uri}decorations/small-chains.png`,
    bigChain: `${uri}decorations/big-chains.png`,
    window: `${uri}decorations/window.png`,
    windowLight: `${uri}decorations/window-light.png`,
  },
  particles: {
    jump: `${uri}particles/jump.png`,
    fall: `${uri}particles/fall.png`,
    run: `${uri}particles/run.png`,
    diamond: `${uri}particles/diamond.png`,
    disappearing: `${uri}particles/disappearing.png`,
  },
  item: {
    heart: `${uri}item/heart.png`,
    diamond: `${uri}item/diamond.png`,
  },
  box: {
    idle: `${uri}box/idle.png`,
    hit: `${uri}box/hit.png`,
    broken1: `${uri}box/broken-1.png`,
    broken2: `${uri}box/broken-2.png`,
    broken3: `${uri}box/broken-3.png`,
    broken4: `${uri}box/broken-4.png`,
  },
};

const soundPaths: SoundPaths = {
  music: '../sound/music.mp3',
  jump: '../sound/jump.wav',
  sword: '../sound/sword.wav',
  walk: '../sound/walk.wav',
  doorIn: '../sound/door-in.mp3',
  doorOut: '../sound/door-out.mp3',
  diamond: '../sound/diamond.mp3',
  fall: '../sound/fall.mp3',
  run: '../sound/run.mp3',
  boxBreak: '../sound/box-break.mp3',
  kill: '../sound/kill.wav',
};

/**
 * Hook that manage resources for the game.
 *
 * @return useResources
 */
const useResources = () => {
  const [textures, setTextures] = useState<TexturesKingsAndPigs>();
  const [sounds, setSounds] = useState<SoundsKingsAndPigs>();

  const loadSounds = async () => {
    const sounds: { [key: string]: Sound } = {};
    const { sound } = await import('@pixi/sound');
    for (const key of Object.keys(soundPaths)) {
      const path = soundPaths[key];
      sounds[key] = sound.add(key, path);
    }
    setSounds(sounds as unknown as SoundsKingsAndPigs);
  };

  useEffect(() => {
    if (sounds) {
      sounds.jump.volume = 0.2;
      sounds.jump.speed = 1.5;
      sounds.music.volume = 0.1;
      sounds.music.loop = true;
      sounds.sword.volume = 0.3;
      sounds.sword.speed = 0.9;
      sounds.doorOut.speed = 0.9;
      sounds.doorOut.volume = 0.15;
      sounds.doorIn.speed = 0.9;
      sounds.doorIn.volume = 0.15;
      sounds.fall.volume = 0.1;
      sounds.run.volume = 0.1;
      sounds.run.loop = true;
      sounds.run.speed = 1.5;
      sounds.boxBreak.volume = 0.2;
      sounds.kill.volume = 0.5;
    }
  }, [sounds]);

  useEffect(() => {
    const loadTextures = async () => {
      const textureKeys = Object.keys(texturePaths);
      const textures: TexturePaths = {};

      for (const key of textureKeys) {
        textures[key] = {};
        const pathMap = texturePaths[key];
        const pathKeys = Object.keys(pathMap);

        for (const pathKey of pathKeys) {
          const path = pathMap[pathKey];
          textures[key][pathKey] = await loadTexture(path);
        }
      }

      setTextures(textures as unknown as TexturesKingsAndPigs);
    };

    const loadTexture = async (path: string) => {
      const resource = await Assets.load(path);
      return resource;
    };

    loadTextures();
  }, []);

  return {
    loadSounds,
    textures,
    sounds,
  };
};

export default useResources;
