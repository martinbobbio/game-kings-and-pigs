import { Container } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import { Point, Texture } from 'pixi.js';

interface CameraProps {
  player: Point;
  children: React.ReactNode;
  width: number;
  height: number;
  texture: Texture;
}

/**
 * Functional component that renders the camera component.
 *
 * @param player for player position and move the camera
 * @param children for wrap the content
 * @param width for according to the map texture
 * @param height for according to the map texture
 * @param texture for centring the level
 * @return React.ReactElement <Camera/>
 */
const Camera = ({ player, children, width, height, texture }: CameraProps) => {
  const windowSize = useWindowSize();

  const scale = 1.7;

  const centerX = windowSize.width / 2;
  const centerY = windowSize.height / 2;

  const minX = centerX / scale;
  const minY = centerY / scale;
  const maxX = width - centerX / scale;
  const maxY = height - centerY / scale;

  const cameraX = Math.min(maxX, Math.max(minX, player.x));
  const cameraY = Math.min(maxY, Math.max(minY, player.y));

  const x = centerX - cameraX * scale;
  const y = centerY - cameraY * scale;

  const windowOffsetX =
    texture.width * scale < windowSize.width
      ? (windowSize.width - texture.width * scale) / 2
      : 0;

  return (
    <Container x={x} y={y}>
      <Container scale={scale} x={-windowOffsetX} y={0}>
        {children}
      </Container>
    </Container>
  );
};

export default Camera;
