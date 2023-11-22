import { useEffect, useState } from 'react';
import { Controls, Map, Menu } from './components';
import { ControlsKingsAndPigs } from './interfaces';
import { useLevel, useResources } from './hooks';
import { KingsAndPigsStyled } from './KingsAndPigs.styled';
import { Loading } from '@/components';

/**
 * Functional component that render the main logic and load data
 *
 * @return React.ReactElement <KingsAndPigs/>
 */
const KingsAndPigs = () => {
  const { level } = useLevel();
  const { textures, sounds, loadSounds } = useResources();
  const [controls, setControls] = useState<ControlsKingsAndPigs>();
  const [isGameRunning, setIsGameRunning] = useState(false);

  const handleStartGame = () => {
    if (!sounds) loadSounds();
    setIsGameRunning(true);
  };

  useEffect(() => {
    if (sounds) sounds.music.play();
  }, [sounds]);

  return (
    <>
      <Menu onStartGame={handleStartGame} isGameRunning={isGameRunning} />
      {isGameRunning && (
        <KingsAndPigsStyled>
          {textures && sounds && level.texture && (
            <Map
              textures={textures}
              level={level}
              sounds={sounds}
              setControls={setControls}
            />
          )}
          {(!textures || !sounds || !level.texture) && (
            <Loading title={`Loading level ${level.current}...`} />
          )}
        </KingsAndPigsStyled>
      )}
      {isGameRunning && controls && <Controls controls={controls} />}
    </>
  );
};

export default KingsAndPigs;
