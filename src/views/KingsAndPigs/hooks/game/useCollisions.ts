import { Block, BoxState, PlayerState } from '../../interfaces';

/**
 * Hook that manage collisions between objects
 *
 * @return useResources
 */
const useCollisions = () => {
  const getIfExistHorizontal = (
    entity: PlayerState | BoxState,
    block: Block
  ) => {
    const { hitbox } = entity;
    const left = hitbox.position.x <= block.position.x + block.width;
    const right = hitbox.position.x + hitbox.width >= block.position.x;
    const top = hitbox.position.y + hitbox.height >= block.position.y;
    const bottom = hitbox.position.y <= block.position.y + block.height;
    return left && right && top && bottom;
  };

  const applyHorizontal = (
    entity: PlayerState | BoxState,
    blocks: Block[],
    setPositionX: (x: number) => void
  ) => {
    const { hitbox } = entity;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (getIfExistHorizontal(entity, block)) {
        const entityIsGoingRight = entity.velocity.x > 0;
        const entityIsGoindLeft = entity.velocity.x < 0;
        if (entityIsGoindLeft) {
          const offset = hitbox.position.x - entity.position.x;
          setPositionX(block.position.x + block.width - offset + 0.01);
          break;
        }
        if (entityIsGoingRight) {
          const offset = hitbox.position.x - entity.position.x + hitbox.width;
          setPositionX(block.position.x - offset - 0.01);
          break;
        }
      }
    }
  };

  const getIfExistVertical = (entity: PlayerState | BoxState, block: Block) => {
    const { hitbox } = entity;
    const left = hitbox.position.x <= block.position.x + block.width;
    const right = hitbox.position.x + hitbox.width >= block.position.x;
    const top = hitbox.position.y + hitbox.height >= block.position.y;
    const bottom = hitbox.position.y <= block.position.y + block.height;

    return left && right && top && bottom;
  };

  const applyVertical = (
    entity: PlayerState | BoxState,
    blocks: Block[],
    setPositionY: (y: number) => void,
    setVelocityY: (y: number) => void,
    checkOnlyUp = false
  ) => {
    const { hitbox } = entity;
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (getIfExistVertical(entity, block)) {
        const entityIsGoingDown = entity.velocity.y > 0;
        const entityIsGoindUp = entity.velocity.y < 0;
        if (entityIsGoindUp && !checkOnlyUp) {
          setVelocityY(0);
          const offset = hitbox.position.y - entity.position.y;
          setPositionY(block.position.y + block.height - offset + 0.01);
          break;
        }
        if (entityIsGoingDown) {
          setVelocityY(0);
          const offset = hitbox.position.y - entity.position.y + hitbox.height;
          setPositionY(block.position.y - offset - 0.01);
          break;
        }
      }
    }
  };

  return {
    applyHorizontal,
    applyVertical,
    getIfExistHorizontal,
    getIfExistVertical,
  };
};

export default useCollisions;
