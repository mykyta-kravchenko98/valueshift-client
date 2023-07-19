import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const drawerWidth = 240;

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    onMenuItemClick: (item: string) => void;
  }

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose, onMenuItemClick }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: drawerWidth }}>
        <List>
          <ListItem button onClick={() => onMenuItemClick('Main')}>
            <ListItemText primary="Main" />
          </ListItem>
          <ListItem button onClick={() => onMenuItemClick('Crypto')}>
            <ListItemText primary="Crypto" />
          </ListItem>
          <ListItem button onClick={() => onMenuItemClick('Stocks')}>
            <ListItemText primary="Stocks" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
