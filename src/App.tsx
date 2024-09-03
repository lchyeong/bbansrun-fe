import './styles/global.css'; // 글로벌 스타일 불러오기

import AppRouter from './router/AppRouter';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
  return (
    <div className="container flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
