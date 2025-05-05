// src/App.jsx
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import Theme from './style/Theme';
import Routers from './Routers';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Routers />
    </ThemeProvider>
  );
}

export default App;

