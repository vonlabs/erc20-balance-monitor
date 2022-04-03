import React, { useEffect } from 'react';

import AddressInput from './components/AddressInput'
import styled from '@emotion/styled';


const Web3 = require('web3');
const provider = process.env.REACT_APP_PROVIDER_URL + process.env.REACT_APP_API_KEY

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


function initializeWeb3(){
  /*eslint-disable */
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('Web3 not detected. Using HTTP Provider')
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
  }
  /*eslint-enable */
}

function App() {
  useEffect(() => {
    initializeWeb3();
  }, []);

  return (
    <AppContainer className="App">
      <AddressInput/>
    </AppContainer>
  );
}

export default App;
