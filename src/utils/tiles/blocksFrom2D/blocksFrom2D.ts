import { Point } from 'pixi.js';

interface Block {
  position: Point;
  width: number;
  height: number;
}

/**
 * Function that returns a parsed tiles in two dimension
 *
 * @param array for parse its in two dimensions
 * @return array
 */
export default (array: number[][], width = 32, height = 32): Block[] => {
  const blocksFrom2D: Block[] = [];

  array.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        blocksFrom2D.push({
          position: new Point(x * 32, y * 32),
          width,
          height,
        });
      }
    });
  });

  return blocksFrom2D;
};
