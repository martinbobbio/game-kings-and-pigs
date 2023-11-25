import { FAIcon, Text } from '@/components';
import {
  BackgroundBlur,
  ButtonPlay,
  Information,
  MenuStyled,
  Screen,
  Title,
} from './Menu.styled';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

interface MenuProps {
  onStartGame: () => void;
  isGameRunning: boolean;
}

/**
 * Functional component that render component menu.
 *
 * @param onStartGame for handle started game
 * @param isGameRunning for some animations
 * @return React.ReactElement <Menu/>
 */
const Menu = ({ onStartGame, isGameRunning }: MenuProps) => {
  return (
    <MenuStyled>
      {!isGameRunning && <BackgroundBlur />}
      <Screen $active={isGameRunning.toString()}>
        <Title>Kings And Pigs</Title>
        <ButtonPlay onClick={onStartGame}>
          <FAIcon
            icon={faCirclePlay}
            animation='beat'
            color='primary'
            size='xxxl'
          />
        </ButtonPlay>
        <Information>
          <Text size='xl'>Controls</Text>
          <br />
          <Text size='md'>
            <span className='underline'>Move Left:</span> Press A or ArrowLeft
          </Text>
          <Text size='md'>
            <span className='underline'>Move Right:</span> Press D or ArrowRight
          </Text>
          <Text size='md'>
            <span className='underline'>Jump:</span> Press W or ArrowDown
          </Text>
          <Text size='md'>
            <span className='underline'>Attack:</span> Press E{' '}
          </Text>
        </Information>
      </Screen>
    </MenuStyled>
  );
};

export default Menu;
