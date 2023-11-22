import { useEffect } from 'react';

/**
 * Hook that handle listeners
 *
 * @return useKeyPress
 */
const useKeyPress = (
  targetKey: string,
  onKeyDownCallback: () => void,
  onKeyUpCallback?: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key.toLowerCase() === targetKey) {
        onKeyDownCallback();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key.toLowerCase() === targetKey && onKeyUpCallback) {
        onKeyUpCallback();
      }
    };

    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [targetKey, onKeyDownCallback, onKeyUpCallback]);
};

export default useKeyPress;
