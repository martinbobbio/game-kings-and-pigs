import {
  ButtonControl,
  ControlsStyled,
  JoystickContainer,
} from './Controls.styled';
import { ControlsKingsAndPigs } from '../../interfaces';
import { useKeyPress } from '@/hooks';
import { FAIcon } from '@/components';
import { faBurst, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { JoystickShape } from 'react-joystick-component';
import {
  IJoystickUpdateEvent,
  Joystick,
} from 'react-joystick-component/build/lib/Joystick';
import { useState } from 'react';

interface ControlProps {
  controls: ControlsKingsAndPigs;
}

const Controls = ({ controls }: ControlProps) => {
  const [lastDirection, setLastDirection] = useState<string>();
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

  const handleJoystickMove = (event: IJoystickUpdateEvent) => {
    if (event.distance && event.distance < 40) return;
    if (event.direction === 'LEFT' && lastDirection === 'RIGHT') {
      onTouchRightEnd();
      setLastDirection('');
    } else if (event.direction === 'RIGHT' && lastDirection === 'LEFT') {
      onTouchLeftEnd();
      setLastDirection('');
    } else if (event.direction === 'RIGHT' && lastDirection !== 'RIGHT') {
      setLastDirection(event.direction);
      onTouchRightStart();
    } else if (event.direction === 'LEFT' && lastDirection !== 'LEFT') {
      setLastDirection(event.direction);
      onTouchLeftStart();
    }
  };

  const handleJoystickStop = () => {
    if (lastDirection === 'RIGHT') {
      onTouchRightEnd();
      setLastDirection('');
    } else if (lastDirection === 'LEFT') {
      onTouchLeftEnd();
      setLastDirection('');
    }
  };

  return (
    <ControlsStyled>
      <ButtonControl
        onTouchStart={onTouchUpStart}
        onTouchEnd={onTouchUpEnd}
        className='jump'
      >
        <FAIcon size='xxl' icon={faUpLong} />
      </ButtonControl>
      <ButtonControl onTouchStart={onTouchSpecial} className='attack'>
        <FAIcon size='xxl' icon={faBurst} />
      </ButtonControl>
      <JoystickContainer>
        <Joystick
          size={100}
          move={handleJoystickMove}
          stop={handleJoystickStop}
          controlPlaneShape={JoystickShape.AxisX}
        />
      </JoystickContainer>
    </ControlsStyled>
  );
};

export default Controls;
