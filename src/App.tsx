import AppRouter from './router/AppRouter';
import ContainerWrapper from './components/ContainerWrapper';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import React from 'react';
import TopMenu from './components/header/TopMenu';

const App: React.FC = () => {
  return (
    <ContainerWrapper>
      <Header />
      <TopMenu />
      <div className="p-4 pt-[70px] pb-[60px] h-full overflow-auto">
        <AppRouter />
      </div>
      <Footer />
    </ContainerWrapper>
  );
};

export default App;
