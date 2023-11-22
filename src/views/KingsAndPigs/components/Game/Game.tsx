import { Boxes, Debugger, Decorations, Doors, Items, Player } from '..';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesKingsAndPigs,
} from '../../interfaces';
import {
  useBoxes,
  useDecorations,
  useDialogBox,
  useDoors,
  useItems,
  useParticles,
  usePlayer,
} from '../../hooks';

const debug = false;

interface GameProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component game with main logic.
 *
 * @param level for level info
 * @param textures for animations and textures for the player
 * @param sounds for player sounds.
 * @param setControls for add behaviors to controls
 * @return React.ReactElement <Game/>
 */
const Game = ({ level, textures, sounds, setControls }: GameProps) => {
  const { doors } = useDoors({
    level,
    textures: textures.door,
  });

  const { dialogBox } = useDialogBox({
    textures: textures.dialogBox,
  });

  const { particles } = useParticles({
    textures: textures.particles,
  });

  const { items } = useItems({
    textures: textures.item,
    diamonds: level.items?.diamonds,
  });

  const { boxes } = useBoxes({
    level,
    sounds,
  });

  const { player } = usePlayer({
    textures: textures.king,
    level,
    doors,
    sounds,
    dialogBox,
    particles,
    items,
    boxes,
    setControls,
  });

  const { decorations } = useDecorations({
    textures: textures.decorations,
    objects: level.decorations,
  });

  return (
    <>
      <Decorations decorations={decorations} />
      <Items items={items} />
      <Doors doors={doors} />
      <Boxes boxes={boxes} textures={textures.box} />
      <Player player={player} dialogBox={dialogBox} particles={particles} />
      {debug && (
        <Debugger
          level={level}
          player={player}
          doors={doors}
          decorations={decorations}
          items={items}
          boxes={boxes}
        />
      )}
    </>
  );
};

export default Game;
