import { Route, Routes } from 'react-router-dom';

import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import MyPage from '../pages/mypage/MyPage';

function AppRouter() {
  return (
    <Routes>
      {/* 디폴트 페이지 */}
      <Route path="*" element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default AppRouter;
