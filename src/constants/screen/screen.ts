export const SCREEN = {
  isVertical:
    screen.orientation.angle === 0 || screen.orientation.angle === 180,
  isHorizontal:
    screen.orientation.angle === 90 || screen.orientation.angle === 270,
};
