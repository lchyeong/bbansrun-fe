import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import React from 'react';
import { logout } from '../../api/authApi'; // 로그아웃 함수 가져오기
import { useAuthStore } from '../../store/useAuthStore'; // 로그인 상태를 가져오는 Zustand 스토어

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
  const { userUuid } = useAuthStore(); // Zustand 스토어에서 uuid 가져오기 (로그인 여부 확인)

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 요청
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link to="/" className="text-gray-500 mr-3">
            <ChevronLeft />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">MyPage</h1>
        </div>

        {/* 로그인 여부에 따른 버튼 표시 */}
        {userUuid ? (
          <button onClick={handleLogout} className="mr-2 text-blue-800">
            로그아웃
          </button>
        ) : (
          <Link to="/login" className="mr-2 text-blue-800">
            로그인
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <ul>
          {userUuid ? (
            <>
              <ListItem to="/account" text="계정 관리" />
              <ListItem to="/favorites" text="좋아요" />
              <ListItem to="/option1" text="여긴뭐?" />
              <ListItem to="/option2" text="여긴뭐??" />
            </>
          ) : (
            <>
              <ListItem to="/public-info" text="공용 정보" />
              <ListItem to="/guest-help" text="방문자 도움말" />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
