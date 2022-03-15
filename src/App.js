import React from 'react'
import { Box, Grid, IconButton } from '@mui/material';
import StepperForm from './components/StepperForm';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const ThemeSwitcher = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', color: 'text.primary', borderRadius: 1 }}>
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

function App() {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Grid item xs={10} md={10}>
            <StepperForm ThemeSwitcher={<ThemeSwitcher />} />
          </Grid>
        </div >
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
