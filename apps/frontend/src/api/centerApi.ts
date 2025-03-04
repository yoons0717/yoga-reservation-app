import api from './api';

// 센터: 회원 목록 조회
export const fetchCenterMembers = async () => {
  const response = await api.get('/center/members');
  return response.data;
};

// 센터: 회원 등록 및 수강권 등록
export const registerMemberWithPass = async (payload: {
  name: string;
  phone: string;
  pass: {
    type: string;
    passCount: number;
    passStartDate: string;
    passEndDate: string;
  };
}) => {
  const response = await api.post('/center/members', payload);
  return response.data;
};
