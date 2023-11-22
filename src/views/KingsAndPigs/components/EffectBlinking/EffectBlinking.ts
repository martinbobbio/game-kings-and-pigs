import { useEffect, useState } from 'react';

interface EffectBlinkingProps {
  children: React.ReactNode;
  blinks: number;
  interval: number;
}

/**
 * Functional component that renders the blinking effect component.
 *
 * @param boxes for render the boxes
 * @param textures for add textures
 * @return React.ReactElement <EffectBlinking/>
 */
const EffectBlinking = ({
  children,
  blinks,
  interval,
}: EffectBlinkingProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [blinksCount, setBlinksCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlinksCount((prev) => prev + 1);

      if (blinksCount >= blinks) {
        clearInterval(intervalId);
      } else {
        setIsVisible((prev) => !prev);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [blinksCount, interval, blinks]);

  return isVisible && children;
};

export default EffectBlinking;
