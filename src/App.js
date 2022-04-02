import AddressInput from './components/AddressInput'
import styled from '@emotion/styled';

const AppContainer = styled.div`
  display: flex;
`

function App() {
  return (
    <AppContainer className="App">
      <AddressInput/>
    </AppContainer>
  );
}

export default App;
