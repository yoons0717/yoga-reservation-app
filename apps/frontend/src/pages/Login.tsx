import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/google`, {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 border rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">구글 로그인</h1>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('로그인 실패')} />
      </div>
    </div>
  );
};

export default Login;
