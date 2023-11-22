import { Container } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import { Point } from 'pixi.js';

interface CameraProps {
  player: Point;
  children: React.ReactNode;
  width: number;
  height: number;
}

/**
 * Functional component that renders the camera component.
 *
 * @param player for player position and move the camera
 * @param children for wrap the content
 * @param width for according to the map texture
 * @param height for according to the map texture
 * @return React.ReactElement <Camera/>
 */
const Camera = ({ player, children, width, height }: CameraProps) => {
  const windowSize = useWindowSize();

  const scale = 1.8;

  const centerX = windowSize.width / 2;
  const centerY = windowSize.heigth / 2;

  const minX = centerX / scale;
  const minY = centerY / scale;
  const maxX = width - centerX / scale;
  const maxY = height - centerY / scale;

  const cameraX = Math.min(maxX, Math.max(minX, player.x));
  const cameraY = Math.min(maxY, Math.max(minY, player.y));

  const x = centerX - cameraX * scale;
  const y = centerY - cameraY * scale;

  return (
    <Container scale={scale} x={x} y={y}>
      {children}
    </Container>
  );
};

export default Camera;
