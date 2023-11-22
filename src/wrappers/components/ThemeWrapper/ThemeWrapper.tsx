import { CONFIG } from '@/constants';
import { ThemeProvider as ThemeStyledComponents } from 'styled-components';
import { createTheme, ThemeProvider as ThemeMaterial } from '@mui/material';
import { useDarkMode } from 'usehooks-ts';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

/**
 * Functional component that render high order component theme with their logic.
 *
 * @param children to wrap other elements
 * @return React.ReactElement <ThemeWrapper/>
 */
const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { isDarkMode } = useDarkMode();
  const theme = isDarkMode ? CONFIG.theme.dark : CONFIG.theme.light;
  return (
    <ThemeStyledComponents theme={theme}>
      <ThemeMaterial theme={createTheme(theme)}>{children}</ThemeMaterial>
    </ThemeStyledComponents>
  );
};

export default ThemeWrapper;
