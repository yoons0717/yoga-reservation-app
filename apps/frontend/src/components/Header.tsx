import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import { MdArrowBack } from 'react-icons/md';
import Button from './Button';
import { User } from '../model/user';

interface HeaderProps {
  showBack?: boolean; // 뒤로가기 버튼을 보여줄지 여부 (옵션)
}

const Header: React.FC<HeaderProps> = ({ showBack = true }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/select-role');
      return;
    }
    axios
      .get(`${API_BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/select-role');
  };

  return (
    <header className="bg-white/90 shadow-sm py-3 px-4 mb-4 flex justify-between items-center">
      <div className="flex items-center">
        {showBack && (
          <button onClick={() => navigate(-1)} className="mr-3">
            <MdArrowBack className="w-5 h-5 text-gray-700" />
          </button>
        )}
        <h1 className="text-l font-semibold text-gray-700">환영합니다, {user?.name}</h1>
      </div>
      <Button variant="secondary" fullWidth={false} onClick={logout}>
        로그아웃
      </Button>
    </header>
  );
};

export default Header;
