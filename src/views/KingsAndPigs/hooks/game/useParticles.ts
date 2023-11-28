import { useMemo, useState } from 'react';
import {
  ParticlesAnimations,
  ParticlesState,
  ParticlesTextures,
} from '../../interfaces';
import { Point } from 'pixi.js';

interface useParticlesProps {
  textures: ParticlesTextures;
}

const useParticles = ({ textures }: useParticlesProps) => {
  const animations: ParticlesAnimations = useMemo(() => {
    return {
      jump: {
        autoplay: true,
        loop: false,
        frameBuffer: 6,
        frameRate: 6,
        texture: textures.jump,
        invertedTile: true,
      },
      fall: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        frameRate: 5,
        texture: textures.fall,
        invertedTile: true,
      },
      run: {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        frameRate: 5,
        texture: textures.run,
        invertedTile: true,
      },
      diamond: {
        autoplay: true,
        loop: false,
        frameBuffer: 6,
        frameRate: 4,
        texture: textures.diamond,
        invertedTile: true,
      },
      disappearing: {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        frameRate: 7,
        texture: textures.disappearing,
        invertedTile: true,
      },
    };
  }, [textures]);

  const [particles, setParticles] = useState<ParticlesState>({
    items: [],
    addParticle: (
      key: keyof ParticlesAnimations,
      position: Point,
      inverted: boolean
    ) => {
      const currentAnimation = animations[key];
      if (key === 'jump') {
        position.y += 24;
        position.x += inverted ? 21 : 4;
      } else if (key === 'fall') {
        position.y += 24;
        position.x += inverted ? 21 : 4;
      } else if (key === 'diamond') {
        position.y += -5;
        position.x += -3;
      } else if (key === 'run') {
        position.y += 23;
        position.x += inverted ? 21 : 0;
      } else if (key === 'disappearing') {
        position.y += 16;
        position.x += inverted ? 32 : 16;
      }
      currentAnimation.onComplete = () => {
        setParticles((prev) => {
          const updatedItems = prev.items.filter(
            (item) => item.currentAnimation !== currentAnimation
          );
          return {
            ...prev,
            items: updatedItems,
          };
        });
      };
      setParticles((prev) => ({
        ...prev,
        items: [...prev.items, { currentAnimation, position, inverted }],
      }));
    },
  });

  return {
    particles,
  };
};

export default useParticles;
