import { useEffect } from 'react';
import { AppStyled } from './App.styled';

interface AppProps {
  children: React.ReactNode;
}

/**
 * Functional component that has the main logic of the application.
 *
 * @return React.ReactElement <Main/>
 */
const App = ({ children }: AppProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <AppStyled>{children}</AppStyled>;
};

export default App;
