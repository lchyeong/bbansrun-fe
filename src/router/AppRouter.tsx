import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Main from '../pages/main/Main';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
