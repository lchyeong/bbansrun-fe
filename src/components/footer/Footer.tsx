import { BottomNavigation, BottomNavigationAction } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import MyPageIcon from '@mui/icons-material/ChildCare';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Footer: React.FC = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className="max-w-[580px] mx-auto w-full fixed bottom-0 bg-white"
    >
      <BottomNavigationAction component={Link} to="/" icon={<HomeIcon />} />
      <BottomNavigationAction icon={<SearchIcon />} />
      <BottomNavigationAction icon={<FavoriteIcon />} />
      <BottomNavigationAction
        component={Link}
        to="/mypage"
        icon={<MyPageIcon />}
      />
    </BottomNavigation>
  );
};

export default Footer;
