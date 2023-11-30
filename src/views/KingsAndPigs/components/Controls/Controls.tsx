import { ButtonControl, ControlsStyled } from './Controls.styled';
import { ControlsKingsAndPigs } from '../../interfaces';
import { useKeyPress } from '@/hooks';
import { FAIcon } from '@/components';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faWandMagic,
} from '@fortawesome/free-solid-svg-icons';

interface ControlProps {
  controls: ControlsKingsAndPigs;
}

const Controls = ({ controls }: ControlProps) => {
  const {
    onTouchLeftStart,
    onTouchLeftEnd,
    onTouchRightStart,
    onTouchRightEnd,
    onTouchUpStart,
    onTouchUpEnd,
    onTouchSpecial,
  } = controls;

  useKeyPress('arrowleft', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('a', onTouchLeftStart, onTouchLeftEnd);
  useKeyPress('arrowright', onTouchRightStart, onTouchRightEnd);
  useKeyPress('d', onTouchRightStart, onTouchRightEnd);
  useKeyPress('arrowup', onTouchUpStart, onTouchUpEnd);
  useKeyPress('w', onTouchUpStart, onTouchUpEnd);
  useKeyPress('e', onTouchSpecial, () => true);

  return (
    <ControlsStyled>
      <ButtonControl
        onTouchStart={controls.onTouchLeftStart}
        onTouchEnd={controls.onTouchLeftEnd}
        className='left'
      >
        <FAIcon size='xxl' icon={faArrowLeft} />
      </ButtonControl>
      <ButtonControl
        onTouchStart={controls.onTouchRightStart}
        onTouchEnd={controls.onTouchRightEnd}
        className='right'
      >
        <FAIcon size='xxl' icon={faArrowRight} />
      </ButtonControl>
      <ButtonControl
        onTouchStart={controls.onTouchUpStart}
        onTouchEnd={controls.onTouchUpEnd}
        className='down-right'
      >
        <FAIcon size='xxl' icon={faArrowUp} />
      </ButtonControl>
      <ButtonControl
        onTouchStart={controls.onTouchSpecial}
        className='down-left'
      >
        <FAIcon size='xxl' icon={faWandMagic} />
      </ButtonControl>
    </ControlsStyled>
  );
};

export default Controls;
