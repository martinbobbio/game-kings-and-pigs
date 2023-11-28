import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCollisions } from '..';
import {
  Block,
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  PlayerState,
  SoundsKingsAndPigs,
  PlayerTextures,
  Animation,
  PlayerAnimations,
  DoorState,
  DialogBoxState,
  ParticlesState,
  ItemState,
  BoxState,
} from '../../interfaces';
import { Point } from 'pixi.js';
import { useTick } from '@pixi/react';

interface usePlayerProps {
  level: LevelKingAndPigs;
  textures: PlayerTextures;
  sounds: SoundsKingsAndPigs;
  doors: DoorState[];
  dialogBox: DialogBoxState;
  particles: ParticlesState;
  items: ItemState[];
  boxes: BoxState[];
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Hook that handles manage the player
 *
 * @param level for know the map values
 * @param textures for render animations
 * @param sounds for making noise
 * @param doors for check collisions
 * @param dialogBox for make animations dialogs
 * @param particles for show particles effects
 * @param item for item logics
 * @param setControls for add behaviors
 * @param boxes for add collision with the player
 * @return usePlayer
 */
const usePlayer = ({
  textures,
  level,
  sounds,
  doors,
  dialogBox,
  particles,
  items,
  boxes,
  setControls,
}: usePlayerProps) => {
  const { initialPosition, collisionBlocks, platformBlocks } = level;
  const { applyHorizontal, applyVertical } = useCollisions();
  const { addParticle } = particles;
  const { addDialog, deleteDialog } = dialogBox;
  const [isFalling, setIsFalling] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [elapsedFrames, setElapsedFrames] = useState(0);
  const [inactiveTime, setInactiveTime] = useState(0);
  const boxesBlocks = boxes.map((box) => box.hitbox);

  const animations = useMemo(() => {
    const animations: PlayerAnimations = {
      idle: {
        autoplay: true,
        loop: true,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 11,
      },
      run: {
        autoplay: true,
        loop: true,
        frameBuffer: 4,
        texture: textures.run,
        frameRate: 8,
      },
      attack: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.attack,
        frameRate: 3,
        invertedTile: true,
      },
      doorIn: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.doorIn,
        frameRate: 8,
        invertedTile: true,
      },
      doorOut: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.doorOut,
        frameRate: 8,
        invertedTile: true,
      },
      dead: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.dead,
        frameRate: 4,
      },
      hit: {
        autoplay: true,
        loop: false,
        frameBuffer: 8,
        texture: textures.hit,
        frameRate: 2,
      },
      fall: {
        autoplay: true,
        loop: false,
        frameBuffer: 1,
        texture: textures.fall,
        frameRate: 1,
      },
    };
    animations.attack.onComplete = () => {
      setTimeout(() => setCurrentAnimation(animations.idle), 100);
    };
    animations.doorIn.onComplete = () => {
      sounds.doorOut.play();
      setTimeout(() => setCurrentAnimation(animations.idle), 100);
    };
    animations.doorOut.onComplete = () => {
      level.onNextLevel();
    };
    return animations;
  }, [textures, sounds.doorOut, level]);

  const initializePlayer = useCallback(
    (): PlayerState => ({
      position: new Point(initialPosition.x, initialPosition.y),
      velocity: new Point(0, 0),
      gravity: 1,
      inverted: false,
      jump: {
        power: 15,
        double: true,
      },
      currentAnimation: animations.doorIn,
      hitbox: {
        position: new Point(initialPosition.x, initialPosition.y),
        width: 24,
        height: 26,
      },
      animations,
    }),
    [animations, initialPosition]
  );

  const [player, setPlayer] = useState<PlayerState>(initializePlayer());

  const updateAttackHitbox = useCallback(() => {
    const offsetX = player.inverted ? -24 : 24;
    setPlayer((prevState) => ({
      ...prevState,
      attackHitbox: {
        position: new Point(
          player.hitbox.position.x + offsetX,
          player.hitbox.position.y
        ),
        width: 32,
        height: 24,
      },
    }));
  }, [player.hitbox.position.x, player.hitbox.position.y, player.inverted]);

  const resetAttackHitbox = useCallback(() => {
    setPlayer((prevState) => ({
      ...prevState,
      attackHitbox: undefined,
    }));
  }, []);

  const setPositionX = useCallback(
    (x: number) => {
      const position = player.position;
      position.x = x;
      setPlayer((prevState) => ({ ...prevState, position }));
    },
    [player.position]
  );

  const setPositionY = useCallback(
    (y: number) => {
      const position = player.position;
      position.y = y;
      setPlayer((prevState) => ({ ...prevState, position }));
    },
    [player.position]
  );

  const setVelocityX = useCallback(
    (x: number) => {
      const velocity = player.velocity;
      velocity.x = x;
      setPlayer((prevState) => ({ ...prevState, velocity }));
    },
    [player.velocity]
  );

  const setVelocityY = useCallback(
    (y: number) => {
      const velocity = player.velocity;
      velocity.y = y;
      setPlayer((prevState) => ({ ...prevState, velocity }));
    },
    [player.velocity]
  );

  const setHitbox = (hitbox: Block) => {
    setPlayer((prevState) => ({ ...prevState, hitbox }));
  };

  const setCurrentAnimation = (currentAnimation: Animation) => {
    setPlayer((prevState) => ({ ...prevState, currentAnimation }));
  };

  const setInverted = (inverted: boolean) => {
    setPlayer((prevState) => ({ ...prevState, inverted }));
  };

  const setDoubleJump = (double: boolean) => {
    setPlayer((prevState) => ({
      ...prevState,
      jump: {
        power: prevState.jump.power,
        double,
      },
    }));
  };

  const applyMovement = () => {
    setPositionX(player.position.x + player.velocity.x);
  };

  const applyGravity = () => {
    setVelocityY(player.velocity.y + player.gravity);
    setPositionY(player.position.y + player.velocity.y);
  };

  const getPlayerPosition = useCallback(() => {
    return new Point(player.position.x, player.position.y);
  }, [player.position.x, player.position.y]);

  const autodetectHitbox = () => {
    const offsetX = player.inverted ? 36 : 18;
    const offsetY = 18;
    const hitbox = player.hitbox;
    hitbox.position.x = player.position.x + offsetX;
    hitbox.position.y = player.position.y + offsetY;
    setHitbox(hitbox);
  };

  const pressRun = useCallback(
    (isLeft: boolean) => {
      if (!isRunning) {
        setIsRunning(true);
        setInverted(isLeft);
        setVelocityX(isLeft ? -5 : 5);
        setCurrentAnimation(animations.run);
        if (isLeft !== player.inverted) {
          if (isLeft) setPositionX(player.position.x - 24);
          else setPositionX(player.position.x + 24);
        }
      }
    },
    [
      animations.run,
      isRunning,
      player.inverted,
      player.position.x,
      setPositionX,
      setVelocityX,
    ]
  );

  const pressStopRun = useCallback(
    (isLeft: boolean) => {
      if (player.currentAnimation === animations.idle) return;
      setIsRunning(false);
      setInverted(isLeft);
      setVelocityX(0);
      setCurrentAnimation(animations.idle);
    },
    [animations.idle, player.currentAnimation, setVelocityX]
  );

  const getCollision = (a: Block, b: Block) => {
    const collisions = {
      left: a.position.x <= b.position.x + b.width,
      right: a.position.x + a.width >= b.position.x,
      bottom: a.position.y + a.height >= b.position.y,
      top: a.position.y <= b.position.y + b.height,
    };
    const { right, left, bottom, top } = collisions;
    if (right && left && bottom && top) return true;
    return false;
  };

  const checkIfCanEnterDoor = useCallback((): DoorState | null => {
    let doorEntered = null;
    doors
      .filter((door) => door.type === 'next')
      .map((door) => {
        if (getCollision(door.hitbox, player.hitbox)) {
          doorEntered = door;
        }
      });
    return doorEntered;
  }, [doors, player.hitbox]);

  const checkIfPickupItem = useCallback(() => {
    items.map((item, i) => {
      if (getCollision(item.hitbox, player.hitbox)) {
        sounds.diamond.play();
        level.deleteDiamond(i);
        level.increaseDiamondStats();
        addParticle('diamond', item.hitbox.position, player.inverted);
      }
    });
  }, [
    items,
    level,
    player.hitbox,
    player.inverted,
    sounds.diamond,
    addParticle,
  ]);

  const enterDoor = useCallback(() => {
    setCurrentAnimation(animations.doorOut);
    sounds.doorIn.play();
  }, [animations.doorOut, sounds.doorIn]);

  const jump = useCallback(() => {
    addParticle('jump', getPlayerPosition(), player.inverted);
    sounds.jump.play();
    setVelocityY(-player.jump.power);
    setDoubleJump(true);
  }, [
    addParticle,
    getPlayerPosition,
    player.inverted,
    player.jump.power,
    sounds.jump,
    setVelocityY,
  ]);

  const doubleJump = useCallback(() => {
    sounds.jump.play();
    addParticle('jump', getPlayerPosition(), player.inverted);
    setVelocityY(-player.jump.power / 1.5);
    setIsFalling(false);
    setDoubleJump(false);
  }, [
    getPlayerPosition,
    addParticle,
    player.inverted,
    player.jump.power,
    setVelocityY,
    sounds.jump,
  ]);

  const pressUp = useCallback(() => {
    if (player.currentAnimation === animations.doorOut) return;
    else if (isJumping) return;
    setIsJumping(true);
    const door = checkIfCanEnterDoor();
    if (door) {
      door.open();
      enterDoor();
    } else if (player.velocity.y === 0) {
      jump();
    } else if (player.jump.double) {
      doubleJump();
    }
  }, [
    player.currentAnimation,
    player.velocity.y,
    player.jump.double,
    animations.doorOut,
    checkIfCanEnterDoor,
    enterDoor,
    jump,
    isJumping,
    doubleJump,
  ]);

  const pressUpStop = useCallback(() => {
    setIsJumping(false);
  }, []);

  const respawn = useCallback(() => {
    const door = doors.find((d) => d.type === 'prev');
    setIsDead(false);
    setIsRunning(false);
    setIsJumping(false);
    setIsFalling(false);
    setInactiveTime(0);
    setElapsedFrames(0);
    setPlayer(initializePlayer());
    door?.open();
  }, [doors, initializePlayer]);

  useEffect(() => {
    if (isDead) return;
    const { x, y } = player.velocity;
    const { currentAnimation } = player;
    if (currentAnimation === animations.idle && x) {
      setCurrentAnimation(player.animations.run);
    }
    if (y > 25) {
      sounds.kill.play();
      setIsDead(true);
      setCurrentAnimation(animations.dead);
      setTimeout(() => {
        addParticle('disappearing', getPlayerPosition(), player.inverted);
        respawn();
      }, 3000);
    } else if (y > 10) setIsFalling(true);
    else if (y === 0) setIsFalling(false);
    if (isFalling && player.velocity.y === 0) {
      sounds.fall.play();
      addParticle('fall', getPlayerPosition(), player.inverted);
    }
  }, [
    addParticle,
    getPlayerPosition,
    respawn,
    animations.idle,
    isDead,
    isFalling,
    player,
    animations.dead,
    sounds.fall,
    sounds.kill,
  ]);

  const pressAttack = useCallback(() => {
    if (!sounds.sword.isPlaying) {
      sounds.sword.play();
      setCurrentAnimation(animations.attack);
    }
  }, [animations.attack, sounds.sword]);

  const checkSayHello = () => {
    const { x, y } = player.velocity;
    const isInactive = x === 0 && y === 0;
    if (isInactive) setInactiveTime((prevInactiveTime) => prevInactiveTime + 1);
    else {
      setInactiveTime(0);
      deleteDialog();
    }
    if (inactiveTime >= 5 * 60) {
      addDialog('hello');
    }
  };

  const checkSayExclamation = () => {
    if (player.currentAnimation === animations.idle) {
      if (checkIfCanEnterDoor()) {
        addDialog('exclamation');
      }
    }
  };

  const checkDialogs = () => {
    checkSayHello();
    checkSayExclamation();
  };

  useEffect(() => {
    setControls({
      onTouchLeftStart: () => pressRun(true),
      onTouchLeftEnd: () => pressStopRun(true),
      onTouchRightStart: () => pressRun(false),
      onTouchRightEnd: () => pressStopRun(false),
      onTouchUpStart: () => pressUp(),
      onTouchUpEnd: () => pressUpStop(),
      onTouchSpecial: () => pressAttack(),
    });
  }, [pressRun, pressStopRun, pressUp, pressAttack, setControls, pressUpStop]);

  useEffect(() => {
    level.updatePlayerPosition(player.position);
  }, [level, player.position]);

  useEffect(() => {
    level.updatePlayerAttakHitbox(player.attackHitbox);
  }, [level, player.attackHitbox]);

  useEffect(() => {
    if (player.animations.attack.texture === player.currentAnimation.texture) {
      updateAttackHitbox();
    } else {
      resetAttackHitbox();
    }
  }, [
    player.animations.attack,
    player.currentAnimation,
    resetAttackHitbox,
    updateAttackHitbox,
  ]);

  useEffect(() => {
    if (isRunning) {
      sounds.run.play();
    } else {
      sounds.run.stop();
    }
  }, [isRunning, sounds.run]);

  useEffect(() => {
    const { y } = player.velocity;
    if (elapsedFrames % 20 == 0 && isRunning && y === 0) {
      addParticle('run', getPlayerPosition(), player.inverted);
    }
  }, [
    isRunning,
    elapsedFrames,
    player.inverted,
    player.velocity,
    getPlayerPosition,
    addParticle,
  ]);

  useTick(() => {
    setElapsedFrames(elapsedFrames + 1);
    applyMovement();
    autodetectHitbox();
    applyHorizontal(player, collisionBlocks, setPositionX);
    applyHorizontal(player, boxesBlocks, setPositionX);
    applyGravity();
    autodetectHitbox();
    applyVertical(player, collisionBlocks, setPositionY, setVelocityY);
    applyVertical(player, boxesBlocks, setPositionY, setVelocityY);
    applyVertical(player, platformBlocks, setPositionY, setVelocityY, true);
    checkDialogs();
    checkIfPickupItem();
  });

  return {
    player,
  };
};

export default usePlayer;
