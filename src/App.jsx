import GlobalStyle from './style/GlobalStyle.js';
import { ThemeProvider } from 'styled-components';
import Theme from './style/Theme.js';
import Routers from './Routers';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routers />
      </ThemeProvider>
    </>
  );
}

export default App;
