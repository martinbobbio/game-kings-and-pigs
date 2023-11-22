import { Container } from '@pixi/react';
import { ItemState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface ItemsProps {
  items: ItemState[];
}

/**
 * Functional component that renders the items component.
 *
 * @return React.ReactElement <Items/>
 */
const Items = ({ items }: ItemsProps) => {
  return items.map(({ position, animation }, i) => (
    <Container key={i} position={position}>
      <TilingSpriteCustom animation={animation} />
    </Container>
  ));
};

export default Items;
