import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineAdminPanelSettings, MdOutlineGroups, MdOutlinePerson } from 'react-icons/md';

const SelectRole: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (role: 'admin' | 'center' | 'member') => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pastelGray">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">SELECT USER TYPE</h1>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* 관리자 카드 */}
          <div
            onClick={() => handleSelect('admin')}
            className="w-64 h-44 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1"
          >
            <MdOutlineAdminPanelSettings className="w-10 h-10 text-purple-500 mb-2" />
            <span className="text-gray-700 font-medium">관리자</span>
          </div>

          {/* 센터(강사) 카드 */}
          <div
            onClick={() => handleSelect('center')}
            className="w-64 h-44 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1"
          >
            <MdOutlineGroups className="w-10 h-10 text-green-500 mb-2" />
            <span className="text-gray-700 font-medium">센터(강사)</span>
          </div>

          {/* 회원 카드 */}
          <div
            onClick={() => handleSelect('member')}
            className="w-64 h-44 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1"
          >
            <MdOutlinePerson className="w-10 h-10 text-pastelPink mb-2" />
            <span className="text-gray-700 font-medium">회원</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectRole;
