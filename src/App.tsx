import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainLayout from './MainLayout';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <MainLayout/>
    </ThemeProvider>
  );
}



export default App;
