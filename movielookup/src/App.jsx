import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UserMovieListPage from './pages/UserMovieListPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/saved" element={<UserMovieListPage list="saved" />} />
      <Route path="/favorites" element={<UserMovieListPage list="favorites" />} />
    </Routes>
  );
}

export default App;