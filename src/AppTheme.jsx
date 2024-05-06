import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';

export const AppTheme = ({ children }) => {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#212121',
        contrastText: '#f1f1f1',
      },
      secondary: {
        main: '#0090f5',
      },
      background: {
        default: '#f5f5f5',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
