import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Center } from '../../model/Center';
import { fetchAdminCenters } from '../../api/adminApi';
import SectionTitle from '../../components/SectionTitle';

const AdminHomePage: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchCenters = async () => {
    try {
      const response = await fetchAdminCenters();
      setCenters(response);
    } catch (error: any) {
      setMessage('센터 목록을 불러오는데 실패했습니다.');
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/select-role');
      return;
    }
    fetchCenters();
  }, [token, navigate]);

  return (
    <>
      <section>
        <SectionTitle title="등록된 센터 목록" />

        {centers?.length === 0 ? (
          <p className="text-center text-gray-500">등록된 센터가 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {centers?.map((center) => (
              <li
                key={center._id}
                className="bg-white p-4 rounded-lg shadow border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-textDark">{center.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(center.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-textGray">전화번호: {center.phone}</p>
                {center.address && <p className="text-sm text-textGray">주소: {center.address}</p>}
              </li>
            ))}
          </ul>
        )}
        {message && <p className="mt-4 text-center text-red-600 text-sm">{message}</p>}
      </section>
      <div className="flex justify-end mt-4">
        <Button variant="primary" onClick={() => navigate('/admin/register-center')}>
          센터 등록
        </Button>
      </div>
    </>
  );
};

export default AdminHomePage;
