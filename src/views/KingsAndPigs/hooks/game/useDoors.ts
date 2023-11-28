import { useMemo, useState } from 'react';
import {
  LevelKingAndPigs,
  DoorState,
  DoorTextures,
  Block,
  DoorAnimations,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useDoorProps {
  level: LevelKingAndPigs;
  textures: DoorTextures;
}

/**
 * Hook that manage doors in the game.
 *
 * @param level for known data level
 * @param textures for the graphics
 * @return useDoors
 */
const useDoors = ({ textures, level }: useDoorProps) => {
  const animations = useMemo(() => {
    const animations: DoorAnimations = {
      idle: {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 1,
      },
      opening: {
        autoplay: true,
        loop: false,
        frameBuffer: 16,
        texture: textures.opening,
        frameRate: 5,
      },
      closing: {
        autoplay: true,
        loop: false,
        frameBuffer: 24,
        texture: textures.closing,
        frameRate: 3,
      },
    };
    return animations;
  }, [textures.closing, textures.idle, textures.opening]);

  const getInitialPosition = (block: Block): Point => {
    const offsetY = 9;
    const offsetX = 25;
    const x = block.position.x - block.width + offsetX;
    const y = block.position.y - block.height + offsetY;
    return new Point(x, y);
  };

  const [doors] = useState<DoorState[]>(
    level.doors.map(({ type, block }) => {
      const currentAnimations = {
        prev: animations.opening,
        next: animations.idle,
      };
      const door: DoorState = {
        position: getInitialPosition(block),
        hitbox: block,
        type,
        currentAnimation: currentAnimations[type],
        animations,
        open: () => (door.currentAnimation = animations.opening),
        idle: () => (door.currentAnimation = animations.idle),
        close: () => (door.currentAnimation = animations.closing),
      };
      return door;
    })
  );

  return {
    doors,
  };
};

export default useDoors;
