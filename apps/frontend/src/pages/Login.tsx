import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { MdArrowBack } from 'react-icons/md';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'member'; // 기본은 회원

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'enterPhone' | 'enterCode'>('enterPhone');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/send-code`, { phone });
      setMessage('인증번호가 전송되었습니다. SMS를 확인해주세요.');
      setStep('enterCode');
    } catch (error: any) {
      setMessage(error.response?.data?.message || '인증번호 전송 실패');
    }
  };

  const verifyCode = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/verify-code`, { phone, code });
      const { token, user } = res.data;
      if (user.role !== role) {
        setMessage(
          `선택한 사용자 유형(${role})과 실제 사용자의 유형(${user.role})이 일치하지 않습니다.`
        );
        return;
      }
      localStorage.setItem('token', token);

      switch (role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'center':
          navigate('/center');
          break;
        case 'member':
          navigate('/member');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || '인증 실패');
    }
  };

  return (
    <>
      <div>
        <button onClick={() => navigate(-1)} className="mr-3">
          <MdArrowBack className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          {role === 'admin' ? '관리자 로그인' : role === 'center' ? '센터 로그인' : '회원 로그인'}
        </h1>
        {step === 'enterPhone' && (
          <div className="w-full max-w-sm">
            <input
              type="text"
              placeholder="핸드폰 번호 입력"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 mb-4"
            />
            <button onClick={sendCode} className="w-full bg-blue-500 text-white p-2">
              인증번호 전송
            </button>
          </div>
        )}
        {step === 'enterCode' && (
          <div className="w-full max-w-sm">
            <input
              type="text"
              placeholder="인증번호 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border p-2 mb-4"
            />
            <button onClick={verifyCode} className="w-full bg-green-500 text-white p-2">
              인증번호 확인
            </button>
          </div>
        )}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </>
  );
};

export default Login;
