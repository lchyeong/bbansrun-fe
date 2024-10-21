import { Route, Routes } from 'react-router-dom';

import CategoryPage from '../pages/category/CategoryPage';
import Login from '../pages/login/LoginPage';
import Main from '../pages/main/MainPage';
import MyPage from '../pages/mypage/MyPage';

function AppRouter() {
  return (
    <Routes>
      {/* 디폴트 페이지 */}
      <Route path="*" element={<Main />} />
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  );
}

export default AppRouter;
