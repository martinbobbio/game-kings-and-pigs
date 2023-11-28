import { Container, Graphics, Sprite, Text } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import { LevelKingAndPigs, TexturesKingsAndPigs } from '../../interfaces';
import { TilingSpriteCustom } from '..';
import { useMemo } from 'react';
import { Point, TextStyle } from 'pixi.js';

interface GUIProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
}

/**
 * Functional component that render GUI with lives and coins customs
 *
 * @param level for updating positions
 * @param textures for drawing the gui
 * @return React.ReactElement <GUI/>
 */
const GraphicUserInterface = ({ level, textures }: GUIProps) => {
  const { isMobile, width } = useWindowSize();
  const animations = useMemo(() => {
    return {
      heart: {
        autoplay: true,
        loop: true,
        frameBuffer: 9,
        texture: textures.livesAndCoins.heart,
        frameRate: 8,
      },
      diamond: {
        autoplay: true,
        loop: true,
        frameBuffer: 9,
        texture: textures.livesAndCoins.diamond,
        frameRate: 8,
      },
      numbers: {
        autoplay: false,
        loop: false,
        frameBuffer: 0,
        texture: textures.livesAndCoins.numbers,
        frameRate: 10,
        nPosition: 11 - level.stats.diamonds,
      },
    };
  }, [textures, level.stats.diamonds]);

  const hearts = [
    { x: 12, y: 10 },
    { x: 22, y: 10 },
    { x: 32, y: 10 },
  ];

  const textStyle = new TextStyle({
    fontFamily: 'Skranji',
    fontSize: 14,
    fill: '#ffffff',
    letterSpacing: 2,
  });

  const positions = {
    livebar: new Point(16, 16),
    level: new Point(!isMobile ? width / 2 - 64 : width * 0.65, 32),
  };

  const scales = {
    livebar: 1.8,
    level: 1.5,
  };

  const formatTimer = (timer: number) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const textMinutes = String(minutes).padStart(2, '0');
    const textSeconds = String(seconds).padStart(2, '0');
    return `${textMinutes}:${textSeconds}`;
  };

  return (
    <>
      <Container scale={scales.livebar} position={positions.livebar}>
        <Sprite texture={textures.livesAndCoins.liveBar} />
        {hearts.splice(0, level.stats.lives).map((heart, i) => (
          <Container key={i} x={heart.x} y={heart.y}>
            <TilingSpriteCustom animation={animations.heart} />
          </Container>
        ))}
        <Container x={8} y={32}>
          <TilingSpriteCustom animation={animations.diamond} />
        </Container>
        <Container x={27} y={34} scale={1.1}>
          <TilingSpriteCustom animation={animations.numbers} />
        </Container>
      </Container>
      <Container position={positions.level}>
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill('#3f3851', 0.5);
            g.drawRoundedRect(-30, -5, 150, 70, 35);
            g.endFill();
          }}
        />
        <Text
          scale={scales.level}
          text={`Level ${level.current}`}
          style={textStyle}
        />
        <Text
          scale={scales.level}
          y={32}
          x={12}
          text={`${formatTimer(level.stats.timer)}`}
          style={textStyle}
        />
      </Container>
    </>
  );
};

export default GraphicUserInterface;
