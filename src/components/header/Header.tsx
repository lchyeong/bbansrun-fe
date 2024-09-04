import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
// Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      className="max-w-[580px] mx-auto w-full bg-black shadow-md"
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow">
          MUSINSA
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
