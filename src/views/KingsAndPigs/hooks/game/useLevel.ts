import { useCallback, useEffect, useState } from 'react';
import { blocksFrom2D, parse2D } from '@/utils';
import {
  LevelKingAndPigs,
  LevelData,
  Block,
  LayerPrimary,
  LayerSecondary,
  LevelDoor,
} from '../../interfaces';
import { Assets, Point, Texture } from 'pixi.js';

/**
 * Hook that handles manage level important properties
 *
 * @return useLevel
 */
const useLevel = () => {
  const [level, setLevel] = useState<LevelKingAndPigs>({
    current: 3,
    texture: null,
    collisionBlocks: [],
    platformBlocks: [],
    initialPosition: new Point(-100, -100),
    doors: [],
    player: {
      position: new Point(-100, -100),
      attackHitbox: undefined,
    },
    items: {
      diamonds: [],
    },
    stats: {
      diamonds: 0,
      timer: 0,
      lives: 3,
    },
    onNextLevel: () => nextLevel(),
    deleteDiamond: (id: number) => deleteDiamond(id),
    updatePlayerPosition: (point: Point) => updatePlayerPosition(point),
    updatePlayerAttakHitbox: (block?: Block) => updatePlayerAttakHitbox(block),
    updateDiamonds: (diamonds: number) => updateDiamonds(diamonds),
    updateLives: (lives: number) => updateLives(lives),
  });
  const currentLevel = level.current;

  const nextLevel = () => {
    setLevel((prevLevel) => ({
      ...prevLevel,
      current: prevLevel.current + 1,
      texture: null,
      collisionBlocks: [],
      doors: [],
    }));
  };

  const deleteDiamond = (id: number) => {
    setLevel((prevLevel) => {
      if (!prevLevel.items?.diamonds) return prevLevel;

      const diamonds = [...prevLevel.items.diamonds];
      diamonds.splice(id, 1);

      return {
        ...prevLevel,
        items: {
          ...prevLevel.items,
          diamonds,
        },
      };
    });
  };

  const updateDiamonds = (diamonds: number) => {
    setLevel((prevLevel) => ({
      ...prevLevel,
      stats: {
        ...prevLevel.stats,
        diamonds,
      },
    }));
  };

  const updateLives = (lives: number) => {
    setLevel((prevLevel) => ({
      ...prevLevel,
      stats: {
        ...prevLevel.stats,
        lives,
      },
    }));
  };

  const updatePlayerPosition = (position: Point) => {
    level.player.position = position;
  };

  const updatePlayerAttakHitbox = (block?: Block) => {
    if (block) level.player.attackHitbox = block;
    else level.player.attackHitbox = undefined;
  };

  const loadLevelTexture = useCallback(async () => {
    const source = await import(
      `../../../../data/chapter-1/level-${currentLevel}.png`
    ).then((module) => module.default);
    const resources: Record<string, Texture> = await Assets.load([source]);
    const texture = resources[source];
    setLevel((prevLevel) => ({ ...prevLevel, texture }));
  }, [currentLevel]);

  const loadlLevelData = useCallback(async () => {
    const levelData: LevelData = await import(
      `../../../../data/chapter-1/level-${currentLevel}.json`
    ).then((module) => module.default);
    const w = levelData.width;

    const getPrimaryLayer = (_name: string, layer?: LayerPrimary[]) => {
      return layer && layer.find(({ name }) => name === _name);
    };

    const getSecondaryLayer = (_name: string, layer?: LayerSecondary[]) => {
      return layer && layer.find(({ name }) => name === _name);
    };

    const getBlocks = (layer?: number[]) => {
      const w = levelData.width;
      if (!layer) return [];
      return blocksFrom2D(parse2D(layer, w));
    };

    const getBlocksPlatform = (layer?: number[]) => {
      if (!layer) return [];
      return blocksFrom2D(parse2D(layer, w), 32, 10);
    };

    const getDoors = (): LevelDoor[] => {
      return [
        {
          type: 'next',
          block: doorNext,
        },
        {
          type: 'prev',
          block: doorPrev,
        },
      ];
    };

    const primaryLayers = {
      detections: getPrimaryLayer('Detections', levelData.layers),
      map: getPrimaryLayer('Map', levelData.layers),
    };

    const { map, detections } = primaryLayers;
    const secondaryLayers = {
      blocks: getSecondaryLayer('Blocks', map?.layers),
      platforms: getSecondaryLayer('Platforms', map?.layers),
      doorNext: getSecondaryLayer('Door Next', detections?.layers),
      doorPrev: getSecondaryLayer('Door Prev', detections?.layers),
      diamonds: getSecondaryLayer('Diamonds', detections?.layers),
      smallChains: getSecondaryLayer('Small Chains', detections?.layers),
      bigChains: getSecondaryLayer('Big Chains', detections?.layers),
      candles: getSecondaryLayer('Candles', detections?.layers),
      windows: getSecondaryLayer('Windows', detections?.layers),
      boxes: getSecondaryLayer('Box', detections?.layers),
    };

    const blocks = {
      blocks: getBlocks(secondaryLayers.blocks?.data),
      doorNext: getBlocks(secondaryLayers?.doorNext?.data),
      doorPrev: getBlocks(secondaryLayers?.doorPrev?.data),
      diamonds: getBlocks(secondaryLayers?.diamonds?.data),
      smallChains: getBlocks(secondaryLayers?.smallChains?.data),
      bigChains: getBlocks(secondaryLayers?.bigChains?.data),
      candles: getBlocks(secondaryLayers?.candles?.data),
      windows: getBlocks(secondaryLayers?.windows?.data),
      boxes: getBlocks(secondaryLayers?.boxes?.data),
      platforms: getBlocksPlatform(secondaryLayers?.platforms?.data),
    };

    const doorNext = blocks?.doorNext?.[0];
    const doorPrev = blocks?.doorPrev?.[0];

    const initialPosition = new Point(
      doorPrev.position.x - 16,
      doorPrev.position.y
    );

    doorPrev.position.x += secondaryLayers.doorPrev?.offsetx || 0;
    doorPrev.position.y += secondaryLayers.doorPrev?.offsety || 0;
    doorNext.position.x += secondaryLayers.doorNext?.offsetx || 0;
    doorNext.position.y += secondaryLayers.doorNext?.offsety || 0;
    initialPosition.x += secondaryLayers.doorPrev?.offsetx || 0;
    initialPosition.y += secondaryLayers.doorPrev?.offsety || 0;

    setLevel((prevLevel) => ({
      ...prevLevel,
      collisionBlocks: blocks.blocks,
      platformBlocks: blocks.platforms,
      doors: getDoors(),
      initialPosition,
      boxes: blocks.boxes,
      decorations: {
        candles: blocks.candles,
        smallChains: blocks.smallChains,
        bigChains: blocks.bigChains,
        windows: blocks.windows,
      },
      items: {
        diamonds: blocks.diamonds,
      },
    }));
  }, [currentLevel]);

  useEffect(() => {
    loadLevelTexture();
    loadlLevelData();
  }, [currentLevel, loadLevelTexture, loadlLevelData]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLevel((prevLevel) => ({
        ...prevLevel,
        stats: {
          ...prevLevel.stats,
          timer: prevLevel.stats.timer + 1,
        },
      }));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return {
    level,
  };
};

export default useLevel;
