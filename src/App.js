import React, { useState } from 'react';
import styled from '@emotion/styled';

// mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


//custom
import AddAddress from './components/AddAddress'
import AddressInput from './components/AddressInput'


const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function App() {
  const [addresses, setAddresses] = useState([]);

  const addAddress = (input) => {
    console.log('input', input)
    let temp = addresses;
    temp.push(input);
    setAddresses(temp)
  };

  return (
    <AppContainer className="App">
      <AppBar>
        <Toolbar>
          <AddAddress
            add={addAddress}
          />
        </Toolbar>
      </AppBar>
      <AddressInput/>
    </AppContainer>
  );
}

export default App;
