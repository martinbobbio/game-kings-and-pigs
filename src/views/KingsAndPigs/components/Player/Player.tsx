import { Container } from '@pixi/react';
import { DialogBoxState, ParticlesState, PlayerState } from '../../interfaces';
import { TilingSpriteCustom } from '..';

interface PlayerProps {
  player: PlayerState;
  dialogBox: DialogBoxState;
  particles: ParticlesState;
}

/**
 * Functional component that renders the player component.
 *
 * @param player for player positions
 * @param dialogBox for player interactions
 * @param particles for player particles effects
 * @return React.ReactElement <Player/>
 */
const Player = ({ player, dialogBox, particles }: PlayerProps) => {
  return (
    <>
      {particles.items.map((particle, i) => (
        <Container key={i} x={particle.position.x} y={particle.position.y}>
          <TilingSpriteCustom
            animation={particle.currentAnimation}
            inverted={particle.inverted}
          />
        </Container>
      ))}
      <Container x={player.position.x} y={player.position.y}>
        <TilingSpriteCustom
          animation={player.currentAnimation}
          inverted={player.inverted}
        />
        {dialogBox.dialog && (
          <Container x={player.inverted ? 25 : 35}>
            <TilingSpriteCustom animation={dialogBox.dialog.currentAnimation} />
          </Container>
        )}
      </Container>
    </>
  );
};

export default Player;
