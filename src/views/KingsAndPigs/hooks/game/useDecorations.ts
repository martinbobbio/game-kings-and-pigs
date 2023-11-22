import { useMemo, useState } from 'react';
import {
  Block,
  DecorationsAnimations,
  DecorationsLevel,
  DecorationsState,
  DecorationsTextures,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useDecorationsProps {
  textures: DecorationsTextures;
  objects?: DecorationsLevel;
}

const useDecorations = ({ textures, objects }: useDecorationsProps) => {
  const animations = useMemo(() => {
    const animations: DecorationsAnimations = {
      candle: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 8,
        loop: true,
        texture: textures.candle,
      },
      candleLight: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 5,
        loop: true,
        texture: textures.candleLight,
      },
      smallChain: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 10,
        loop: true,
        texture: textures.smallChain,
      },
      bigChain: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 10,
        loop: true,
        texture: textures.bigChain,
      },
      window: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 37,
        loop: true,
        texture: textures.window,
      },
      windowLight: {
        autoplay: true,
        frameBuffer: 8,
        frameRate: 4,
        loop: true,
        texture: textures.windowLight,
      },
    };
    return animations;
  }, [textures]);

  const adjustPosition = (
    { position }: Block,
    offsetX: number,
    offsetY: number
  ): Point => {
    const x = position.x + offsetX;
    const y = position.y + offsetY;
    return new Point(x, y);
  };

  const [decorations] = useState<DecorationsState[]>(() => {
    const candles = objects?.candles?.map((hitbox) => ({
      hitbox,
      animation: animations.candle,
      position: adjustPosition(hitbox, 8, -8),
    }));
    const candlesLights = objects?.candles?.map((hitbox) => ({
      hitbox,
      animation: animations.candleLight,
      position: adjustPosition(hitbox, -10, -50),
    }));
    const smallChains = objects?.smallChains?.map((hitbox) => ({
      hitbox,
      animation: animations.smallChain,
      position: adjustPosition(hitbox, 0, 0),
    }));
    const bigChains = objects?.bigChains?.map((hitbox) => ({
      hitbox,
      animation: animations.bigChain,
      position: adjustPosition(hitbox, 16, 0),
    }));
    const windows = objects?.windows?.map((hitbox) => ({
      hitbox,
      animation: animations.window,
      position: adjustPosition(hitbox, -5, -4),
      scale: 1.35,
    }));
    const windowsLight = objects?.windows?.map((hitbox) => ({
      hitbox,
      animation: animations.windowLight,
      position: adjustPosition(hitbox, -5, -4),
    }));
    return [
      ...(candles || []),
      ...(candlesLights || []),
      ...(smallChains || []),
      ...(bigChains || []),
      ...(windows || []),
      ...(windowsLight || []),
    ];
  });

  return {
    decorations,
  };
};

export default useDecorations;
