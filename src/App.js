import AddressInput from './components/AddressInput'
import styled from '@emotion/styled';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <AppContainer className="App">
      <AddressInput/>
    </AppContainer>
  );
}

export default App;
