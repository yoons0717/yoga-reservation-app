import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const RegisterMember: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passType, setPassType] = useState('30일');
  const [passCount, setPassCount] = useState<number>(0);
  const [passStartDate, setPassStartDate] = useState('');
  const [passEndDate, setPassEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    try {
      const payload = {
        name,
        phone,
        pass: {
          type: passType,
          passCount,
          passStartDate,
          passEndDate,
        },
      };
      await axios.post(`${API_BASE_URL}/center/members`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('회원 및 수강권 등록 성공!');
      // 등록 후 입력값 초기화 (필요 시)
      setName('');
      setPhone('');
      setPassType('30일');
      setPassCount(0);
      setPassStartDate('');
      setPassEndDate('');
    } catch (error: any) {
      setMessage(error.response?.data?.message || '회원 등록에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">회원 및 수강권 등록</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="핸드폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2"
          required
        />
        <div>
          <label className="block mb-1">수강권 종류</label>
          <select
            value={passType}
            onChange={(e) => setPassType(e.target.value)}
            className="w-full border p-2"
          >
            <option value="30일">30일</option>
            <option value="60일">60일</option>
            <option value="90일">90일</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="수강권 횟수"
          value={passCount}
          onChange={(e) => setPassCount(Number(e.target.value))}
          className="w-full border p-2"
          required
        />
        <div>
          <label className="block mb-1">수강권 시작 날짜</label>
          <input
            type="date"
            value={passStartDate}
            onChange={(e) => setPassStartDate(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">수강권 종료 날짜</label>
          <input
            type="date"
            value={passEndDate}
            onChange={(e) => setPassEndDate(e.target.value)}
            className="w-full border p-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          등록하기
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default RegisterMember;
