import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)`
  background-color: ${(props) => props.theme.palette.background.default};
`;

const Logo = styled(Typography)`
  display: flex;
  align-items: center;
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const LogoImage = styled('img')`
  width: 50px; /* Adjust the width as needed */
  height: 50px; /* Maintain aspect ratio */
  margin-right: ${(props) => props.theme.spacing(1)};
`;

const Header: React.FC<{ onMenuToggle: () => void }> = ({ onMenuToggle }) => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
      <IconButton color="inherit" edge="start" onClick={onMenuToggle}>
          <MenuIcon />
        </IconButton>
        <Logo variant="h6">
        <LogoImage src={require('./logo.png')} alt="Logo" />
          ValueShift
        </Logo>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
