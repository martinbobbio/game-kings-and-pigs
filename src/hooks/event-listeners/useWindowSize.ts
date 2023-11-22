import { useEffect, useState } from 'react';

/**
 * Hook that handles window size and mobile detection.
 *
 * @return {useWindowSizeResponse}
 */
const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [heigth, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(isMobileQuery.matches);
    };

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    checkIsMobile();

    window.addEventListener('resize', () => {
      handleResize();
      checkIsMobile();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, heigth, width };
};

export default useWindowSize;
