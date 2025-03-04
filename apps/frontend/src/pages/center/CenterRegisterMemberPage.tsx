import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerMemberWithPass } from '../../api/centerApi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';

const CenterRegisterMemberPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passType, setPassType] = useState('30일');
  const [passCount, setPassCount] = useState<number>(0);
  const [passStartDate, setPassStartDate] = useState('');
  const [passEndDate, setPassEndDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setMessage('회원 이름과 핸드폰 번호는 필수입니다.');
      return;
    }
    if (!passType || !passCount || !passStartDate || !passEndDate) {
      setMessage('수강권 정보(종류, 횟수, 시작/종료 날짜)를 모두 입력해주세요.');
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
      await registerMemberWithPass(payload);
      setMessage('회원 등록 성공!');
      navigate('/center');
    } catch (error: any) {
      setMessage(error.response?.data?.message || '회원 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <SectionTitle title="회원 등록" />
      <div className="mx-auto bg-white p-4 rounded-lg shadow-sm space-y-4">
        <form onSubmit={handleSubmit}>
          <Input
            label="회원 이름"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="핸드폰 번호"
            type="text"
            placeholder="핸드폰 번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">수강권 종류</label>
            <select
              value={passType}
              onChange={(e) => setPassType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue"
            >
              <option value="30일">30일</option>
              <option value="60일">60일</option>
              <option value="90일">90일</option>
            </select>
          </div>
          <Input
            label="수강권 횟수"
            type="number"
            placeholder="횟수"
            value={passCount}
            onChange={(e) => setPassCount(Number(e.target.value))}
            required
          />
          <Input
            label="수강권 시작 날짜"
            type="date"
            value={passStartDate}
            onChange={(e) => setPassStartDate(e.target.value)}
            required
          />
          <Input
            label="수강권 종료 날짜"
            type="date"
            value={passEndDate}
            onChange={(e) => setPassEndDate(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            회원 등록
          </Button>
        </form>
        {message && <p className="mt-3 text-center text-xs text-red-500">{message}</p>}
      </div>
    </>
  );
};

export default CenterRegisterMemberPage;
