import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Login from './pages/Login';
import 'tailwindcss/tailwind.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  console.error('❌ GOOGLE_CLIENT_ID가 설정되지 않았습니다!');
}

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-around">
            <Link to="/" className="px-4 py-2">
              홈
            </Link>
            <Link to="/login" className="px-4 py-2">
              로그인
            </Link>
          </nav>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
