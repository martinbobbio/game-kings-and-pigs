import { useEffect, useState } from 'react';

/**
 * Hook that handles window size and mobile detection.
 *
 * @return {useWindowSizeResponse}
 */
const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement
  );
  const [isOrientationAngleZero, setIsOrientationAngleZero] = useState(
    window.screen.orientation?.angle === 0
  );

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileQuery = window.matchMedia('(max-width: 600px)');
      setIsMobile(isMobileQuery.matches);
    };

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleOrientationChange = () => {
      setIsOrientationAngleZero(window.screen.orientation?.angle === 0);
    };

    checkIsMobile();

    window.addEventListener('resize', () => {
      handleResize();
      handleOrientationChange();
      checkIsMobile();
    });

    window.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return { isMobile, height, width, isFullscreen, isOrientationAngleZero };
};

export default useWindowSize;
