import { Stage, Sprite } from '@pixi/react';
import { useWindowSize } from '@/hooks';
import {
  ControlsKingsAndPigs,
  LevelKingAndPigs,
  SoundsKingsAndPigs,
  TexturesKingsAndPigs,
} from '../../interfaces';
import { Camera, Game, GraphicUserInterface } from '..';
import { Texture } from 'pixi.js';

interface MapProps {
  textures: TexturesKingsAndPigs;
  level: LevelKingAndPigs;
  sounds: SoundsKingsAndPigs;
  setControls: (controls: ControlsKingsAndPigs) => void;
}

/**
 * Functional component that render component map.
 *
 * @param level for the current level with their blocks and objects
 * @param textures for the current map textures
 * @param sounds for the music and effects
 * @param setControls for add behaviors
 * @return React.ReactElement <Map/>
 */
const Map = ({ textures, sounds, level, setControls }: MapProps) => {
  const windowSize = useWindowSize();
  level.texture = level.texture as Texture;
  const width = level.texture.width;
  const height = level.texture.height;
  const player = level.player.position;
  const texture = level.texture;

  return (
    <Stage
      width={windowSize.width}
      height={windowSize.height}
      options={{ background: '#3f3851' }}
    >
      <Camera player={player} width={width} height={height} texture={texture}>
        <Sprite width={width} height={height} texture={texture} />
        <Game
          setControls={setControls}
          sounds={sounds}
          textures={textures}
          level={level}
        />
      </Camera>
      <GraphicUserInterface textures={textures} level={level} />
    </Stage>
  );
};

export default Map;
