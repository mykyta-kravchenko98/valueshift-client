import React, { useState } from 'react';
import { styled } from '@mui/system';
import Header from './Header';
import SideMenu from './SideMenu';
import CurrencyConverterForm from './CurrencyConverterForm';
import CoinDashboard from './CoinDashboard';
import StockDashboard from './StockDashboard';
import { Paper } from '@mui/material';

const MainContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '5rem', // Adjust as needed
});

const MainLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Main');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
    toggleDrawer();
  };

  return (
    <>
      <Header onMenuToggle={toggleDrawer} />
      <SideMenu open={open} onClose={() => setOpen(false)} onMenuItemClick={handleMenuItemClick} />
      <Paper square style={{ minHeight: '100vh', height: '100%' }}>
        <MainContent>
            {selectedItem === 'Main' && <CurrencyConverterForm />}
            {selectedItem === 'Crypto' && <CoinDashboard />}
            {selectedItem === 'Stocks' && <StockDashboard />}
        </MainContent>
      </Paper>
    </>
  );
};

export default MainLayout;
