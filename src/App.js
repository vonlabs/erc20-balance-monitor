import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

// mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// mui icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

// custom
import AddAddress from './components/AddAddress'
import AddressInput from './components/AddressInput'
import Table from './components/Table'

// shared
import getBalance from './shared/getBalance';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc( 100vh - 64px );
  width: 100vw;
  padding-top: 64px;
  &.dark-mode {
   // background-color: rgb(13, 23, 34);
    background-color: rgb(30, 30, 30);
  }
`

const SToolbar = styled(Toolbar)`
  justify-content: space-between;
`

const getFromLocalStorage = localStorage.addresses ? JSON.parse(localStorage.addresses) : [];

function App() {

  const [addresses, setAddresses] = useState(getFromLocalStorage);
  const [balances, setBalances] = useState({});
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
    let uuid = uuidv4();
    let temp =  [...addresses, {uuid, ...input}]
    setAddresses(temp);
    localStorage.setItem('addresses', JSON.stringify(temp));
    updateBalance(input.coin, input.address, uuid);
  };

  const removeAddress = (uuid) => {
    let temp = JSON.parse(JSON.stringify(addresses)); //fastest way of copyinh an Array
    temp = temp.filter( (item) => item.uuid !== uuid);
    setAddresses(temp);
    localStorage.setItem('addresses', JSON.stringify(temp));
  };

  async function updateBalance (coin, address, uuid) {
    let balance = await getBalance(coin, address);
    let temp = Object.assign({}, balances, {});
    temp[uuid] = balance;
    setBalances(temp);
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
          balances={balances}
          removeAddress={removeAddress}
        />
        <AddressInput/>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
