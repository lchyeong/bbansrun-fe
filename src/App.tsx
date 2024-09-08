import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import ContainerWrapper from './components/ContainerWrapper';
import Footer from './components/footer/Footer';
import FullScreenWrapper from './components/FullScreenWrapper';
import Header from './components/header/Header';
import TopMenu from './components/header/TopMenu';
import { fetchAuthInfo } from './api/authApi';

const AppContent: React.FC = () => {
  const location = useLocation();

  // 앱이 시작될 때 유저 정보를 가져오는 함수 호출
  useEffect(() => {
    fetchAuthInfo(); // 페이지가 로드될 때 fetchAuthInfo 실행
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때만 실행됨

  const fullScreenPages = ['/mypage', '/login'];
  const isFullScreen = fullScreenPages.includes(location.pathname);

  return (
    <>
      {isFullScreen ? (
        <FullScreenWrapper>
          <AppRouter />
        </FullScreenWrapper>
      ) : (
        <ContainerWrapper>
          <Header isAdmin={true} />
          <TopMenu />
          <div className="p-4 pt-[70px] pb-[60px] h-full overflow-auto">
            <AppRouter />
          </div>
          <Footer />
        </ContainerWrapper>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
