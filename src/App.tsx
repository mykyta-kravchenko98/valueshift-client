import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CoinDashboard from './CoinDashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: '100%' }}>
        <CoinDashboard/>
      </div>
    </ThemeProvider>
  );
}



export default App;
