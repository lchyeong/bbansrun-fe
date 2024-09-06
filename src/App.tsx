import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import ContainerWrapper from './components/ContainerWrapper';
import Footer from './components/footer/Footer';
import FullScreenWrapper from './components/FullScreenWrapper';
import Header from './components/header/Header';
import React from 'react';
import TopMenu from './components/header/TopMenu';

const AppContent: React.FC = () => {
  const location = useLocation();

  const fullScreenPages = ['/mypage'];
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
