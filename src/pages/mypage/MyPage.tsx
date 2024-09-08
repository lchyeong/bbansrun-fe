import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import React from 'react';
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
          {/* 로그인하지 않았을 때만 '로그인 하기' 항목 표시 */}
          {!userUuid && (
            <div className="bg-white p-4 rounded flex justify-between items-center">
              <span></span>
              {/* '로그인 하기' 링크를 오른쪽으로 배치 */}
              <Link to="/login" className="mr-2 text-blue-800">
                로그인
              </Link>
            </div>
          )}
          {/* 로그인 상태에 따라 다른 항목 렌더링 */}
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
