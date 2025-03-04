import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { Member } from '../../model/Member';
import { fetchCenterMembers } from '../../api/centerApi';
import SectionTitle from '../../components/SectionTitle';

const CenterHomePage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchMembers = async () => {
    try {
      const response = await fetchCenterMembers();
      setMembers(response);
    } catch (error: any) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/select-role');
      return;
    }
    fetchMembers();
  }, [token, navigate]);

  return (
    <>
      <SectionTitle title="등록된 회원 목록" />

      {members?.length === 0 ? (
        <p className="text-center text-gray-500">등록된 회원이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {members.map((member) => (
            <li key={member._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-bold text-textDark">{member.name}</h3>
              <p className="mt-1 text-sm text-textGray">핸드폰: {member.phone}</p>
              {member.pass ? (
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="text-sm font-medium text-blue-800">수강권 정보</p>
                  <p className="text-xs text-blue-800">종류: {member.pass.type}</p>
                  <p className="text-xs text-blue-800">
                    총 횟수: {member.pass.passCount}회, 사용: {member.pass.usedPasses}회, 남은:{' '}
                    {member.pass.passCount - member.pass.usedPasses}회
                  </p>
                  <p className="text-xs text-blue-800">
                    유효기간: {new Date(member.pass.passStartDate).toLocaleDateString()} ~{' '}
                    {new Date(member.pass.passEndDate).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-xs text-gray-500">수강권 정보가 없습니다.</p>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end mt-4">
        <Button variant="primary" onClick={() => navigate('/center/register-member')}>
          회원 등록
        </Button>
      </div>
    </>
  );
};

export default CenterHomePage;
