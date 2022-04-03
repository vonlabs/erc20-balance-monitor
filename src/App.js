import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';

// mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// mui icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

//custom
import AddAddress from './components/AddAddress'
import AddressInput from './components/AddressInput'
import Table from './components/Table'


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin-top: 64px;
  &.dark-mode {
   // background-color: rgb(13, 23, 34);
    background-color: rgb(30, 30, 30);
  }
`

const SToolbar = styled(Toolbar)`
  justify-content: space-between;
`

function App() {
  const [addresses, setAddresses] = useState([]);
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const addAddress = (input) => {
    setAddresses(addresses => [...addresses, input]);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer 
        className={`App ${mode}-mode`}
      >
        <AppBar>
          <SToolbar>
            <AddAddress
              add={addAddress}
            />
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <Brightness4Icon />}
            </IconButton>
          </SToolbar>
        </AppBar>
        <Table
          addresses={addresses}
        />
        <AddressInput/>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
