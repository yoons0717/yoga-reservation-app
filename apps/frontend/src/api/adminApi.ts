import api from './api';

// 관리자: 센터 목록 조회
export const fetchAdminCenters = async () => {
  const response = await api.get('/admin/centers');
  return response.data;
};

// 관리자: 센터 등록
export const registerCenter = async (payload: {
  name: string;
  phone: string;
  address?: string;
}) => {
  const response = await api.post('/admin/centers', payload);
  return response.data;
};
