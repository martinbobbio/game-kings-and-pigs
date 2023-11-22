import { Container } from '@pixi/react';
import { DoorState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface DoorsProps {
  doors: DoorState[];
}

/**
 * Functional component that renders the doors component.
 *
 * @return React.ReactElement <Doors/>
 */
const Doors = ({ doors }: DoorsProps) => {
  return doors?.map((door, i) => (
    <Container key={i} x={door.position.x} y={door.position.y}>
      <TilingSpriteCustom animation={door.currentAnimation} />
    </Container>
  ));
};

export default Doors;
