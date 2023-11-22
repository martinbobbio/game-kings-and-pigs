import { Container } from '@pixi/react';
import { BoxState, BoxTextures } from '../../interfaces';
import { EffectBlinking, TilingSpriteCustom } from '..';

interface BoxesProps {
  boxes: BoxState[];
  textures: BoxTextures;
}

/**
 * Functional component that renders the boxes component.
 *
 * @param boxes for render the boxes
 * @param textures for add textures
 * @return React.ReactElement <Boxes/>
 */
const Boxes = ({ boxes, textures }: BoxesProps) => {
  const renderByStatus = (box: BoxState) => {
    const renderIdle = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.idle,
        frameRate: 1,
      };
      return <TilingSpriteCustom animation={animation} />;
    };

    const renderHit = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        texture: textures.hit,
        frameRate: 1,
      };
      return <TilingSpriteCustom animation={animation} />;
    };

    const renderBroken = () => {
      const animation = {
        autoplay: true,
        loop: false,
        frameBuffer: 4,
        frameRate: 1,
      };
      const pieces = [
        {
          x: 0,
          y: -12,
          animation: { ...animation, texture: textures.broken1 },
        },
        {
          x: 7,
          y: -12,
          animation: { ...animation, texture: textures.broken2 },
        },
        {
          x: 2,
          y: -12,
          animation: { ...animation, texture: textures.broken2 },
        },
      ];
      return pieces.map((piece, i) => (
        <Container key={i} x={piece.x} y={piece.y}>
          <EffectBlinking blinks={6} interval={200}>
            <TilingSpriteCustom animation={piece.animation} />
          </EffectBlinking>
        </Container>
      ));
    };

    switch (box.behavior) {
      case 'IDLE':
        return renderIdle();
      case 'HIT':
        return renderHit();
      case 'BROKEN':
        return renderBroken();
    }
  };

  return boxes?.map((box, i) => (
    <Container key={i} x={box.position.x} y={box.position.y}>
      {renderByStatus(box)}
    </Container>
  ));
};

export default Boxes;
