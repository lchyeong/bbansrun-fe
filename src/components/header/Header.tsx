import { Box, IconButton, Typography } from '@mui/material';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface HeaderProps {
  isAdmin: boolean; // 관리자 여부를 prop으로 받아서 제어
}

const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  return (
    <Box
      sx={{
        height: '60px', // 높이를 60px로 증가
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white', // 배경색을 primary로 설정
        color: '#000000',
        px: 2,
        width: '100%',
        maxWidth: '580px',
        mx: 'auto',
        position: 'relative',
        borderBottom: '1px solid #000',
      }}
    >
      {/* 왼쪽 타이틀 */}
      <Typography variant="h6" component="div">
        BBANS RUN
      </Typography>

      {/* 오른쪽 아이콘 그룹 */}
      <Box>
        {isAdmin && (
          <IconButton color="inherit" aria-label="admin panel">
            <AdminPanelSettingsIcon />
          </IconButton>
        )}
        <IconButton color="inherit" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="shopping cart">
          <ShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
