import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { registerCenter } from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';

const AdminRegisterCenter: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setMessage('센터 이름과 전화번호는 필수입니다.');
      return;
    }
    try {
      const payload = { name, phone, address };
      await registerCenter(payload);
      navigate('/admin');
      // 등록 후 대시보드로 이동하거나 목록 새로 갱신
    } catch (error: any) {
      setMessage(error.response?.data?.message || '센터 등록 실패');
    }
  };

  return (
    <>
      <SectionTitle title="센터 등록" />
      <div className="mx-auto bg-white p-4 rounded-lg shadow-sm space-y-4">
        <form onSubmit={handleSubmit}>
          <Input
            label="센터 이름"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="전화번호"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            label="주소 (선택)"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" variant="primary" fullWidth>
            등록하기
          </Button>
          {message && <p className="mt-3 text-center text-xs text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default AdminRegisterCenter;
