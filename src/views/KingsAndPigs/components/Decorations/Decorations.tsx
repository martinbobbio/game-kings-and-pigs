import { Container } from '@pixi/react';
import { DecorationsState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface DecorationsProps {
  decorations: DecorationsState[];
}

/**
 * Functional component that renders the decoration component.
 *
 * @return React.ReactElement <Decorations/>
 */
const Decorations = ({ decorations }: DecorationsProps) => {
  return decorations.map(({ position, animation, scale = 1 }, i) => (
    <Container key={i} position={position} scale={scale}>
      <TilingSpriteCustom animation={animation} />
    </Container>
  ));
};

export default Decorations;
