import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import React from 'react';

interface ListItemProps {
  to: string;
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({ to, text }) => {
  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200">
      <Link to={to} className="flex items-center w-full">
        <div className="mr-3"></div>
        <span className="text-gray-800">{text}</span>
      </Link>
      <ChevronRight className="text-gray-500" />
    </li>
  );
};

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center mb-4">
        <Link to="/" className="text-gray-500 mr-3">
          <ChevronLeft />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">MyPage</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <ul>
          <ListItem to="/" text="계정 관리" />
          <ListItem to="/" text="좋아요" />
          <ListItem to="/" text="여긴뭐?" />
          <ListItem to="/" text="여긴뭐??" />
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
