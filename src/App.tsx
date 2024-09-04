import AppRouter from './router/AppRouter';
import ContainerWrapper from './components/ContainerWrapper';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import React from 'react';

const App: React.FC = () => {
  return (
    <ContainerWrapper>
      <Header />
      <div className="flex-grow p-20">
        <AppRouter />
      </div>
      <Footer />
    </ContainerWrapper>
  );
};

export default App;
