import { useEffect, useState } from 'react';
import {
  LevelKingAndPigs,
  BoxState,
  Block,
  SoundsKingsAndPigs,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useTick } from '@pixi/react';
import debounce from 'lodash/debounce';
import { useCollisions } from '..';

interface useBoxesProps {
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
}

/**
 * Hook that manage boxes in the game.
 *
 * @param level for known data level
 * @param sounds for making noise effects
 * @return useBoxes
 */
const useBoxes = ({ level, sounds }: useBoxesProps) => {
  const gravity = 1;

  const getInitialPosition = (block: Block): Point => {
    const offsetY = 40;
    const offsetX = 40;
    const x = block.position.x - block.width + offsetX;
    const y = block.position.y - block.height + offsetY;
    return new Point(x, y);
  };

  const [boxes, setBoxes] = useState<BoxState[]>(
    level?.boxes?.map((block) => {
      const box: BoxState = {
        position: getInitialPosition(block),
        velocity: new Point(0, 0),
        behavior: 'IDLE',
        hitbox: {
          height: 18,
          width: 21,
          position: getInitialPosition(block),
        },
      };
      return box;
    }) || []
  );
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const { applyVertical, getIfExistVertical } = useCollisions();

  const updateHitbox = (box: BoxState) => {
    const offsetX = 0;
    const offsetY = -2;
    box.hitbox.position.x = box.position.x + offsetX;
    box.hitbox.position.y = box.position.y + offsetY;
  };

  const applyGravity = (box: BoxState) => {
    box.velocity.y = box.velocity.y + gravity;
    box.position.y = box.position.y + box.velocity.y;
  };

  const applyCollisions = (box: BoxState) => {
    const updatePositionY = (y: number) => (box.position.y = y);
    const updateVelocityY = (y: number) => (box.velocity.y = y);
    const { collisionBlocks } = level;
    const hitboxes = boxes
      .filter((_box) => _box !== box)
      .map((_box) => _box.hitbox);
    applyVertical(box, collisionBlocks, updatePositionY, updateVelocityY);
    applyVertical(box, hitboxes, updatePositionY, updateVelocityY);
  };

  const updateBox = (box: BoxState, values: BoxState) => {
    setBoxes((prevBoxes) => {
      return prevBoxes.map((prevBox) => {
        if (prevBox === box) {
          return {
            ...prevBox,
            ...values,
          };
        }
        return prevBox;
      });
    });
  };

  const checkIfIsBroken = (box: BoxState) => {
    if (box.behavior !== 'IDLE') return;
    const { attackHitbox } = level.player;
    if (attackHitbox) {
      const isBroken = getIfExistVertical(box, attackHitbox);
      if (isBroken) {
        updateBox(box, { ...box, behavior: 'HIT' });
        sounds.boxBreak.play();
      }
    }
  };

  useEffect(() => {
    boxes.map((box) => {
      switch (box.behavior) {
        case 'HIT':
          debounce(() => {
            updateBox(box, {
              ...box,
              behavior: 'BROKEN',
              hitbox: {
                height: 0,
                width: 0,
                position: box.hitbox.position,
              },
            });
          }, 200)();
          break;
        case 'BROKEN':
          debounce(() => {
            updateBox(box, { ...box, behavior: 'EXTINCTED' });
          }, 1200)();
          break;
        default:
          break;
      }
    });
  }, [boxes]);

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
    boxes.map((box) => {
      applyGravity(box);
      updateHitbox(box);
      applyCollisions(box);
      checkIfIsBroken(box);
    });
  });

  return {
    boxes,
  };
};

export default useBoxes;
