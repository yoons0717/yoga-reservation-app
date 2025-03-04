import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PassPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'수강권' | '시설 정보' | '시설 선택'>('수강권');

  const handleTabClick = (tab: '수강권' | '시설 정보' | '시설 선택') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bgLight">
      <Header title="리타요가 월&테라피" />
      {/* 탭 영역 */}
      <div className="bg-white px-4">
        <div className="flex border-b border-divider">
          {(['수강권', '시설 정보', '시설 선택'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === tab ? 'text-brandBlue border-b-2 border-brandBlue' : 'text-textGray'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* 탭 내용 영역 */}
      <main className="flex-grow px-4 py-3">
        {activeTab === '수강권' && (
          <div>
            {/* 예: 수강권 카드 */}
            <div className="bg-brandBlue text-white rounded-lg p-4 mb-4 shadow">
              <p className="text-sm">사용중</p>
              <h2 className="text-lg font-semibold mt-1">재등록 3개월 주3회</h2>
              <p className="text-xs mt-2">2025.1.31 ~ 2025.3.30 (58일 남음)</p>
              <div className="flex justify-between text-xs mt-1">
                <p>총 17회</p>
                <p>취소수 3회</p>
                <p>현재 18/40</p>
              </div>
            </div>

            {/* 예약된 수업 섹션 */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-textDark">예약된 수업</h3>
              <button className="text-xs text-textGray">예약 전체보기</button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-sm">
              <p className="text-textDark mb-1">2025.03.04 (화) 09:30 ~ 10:30</p>
              <p className="text-textGray">귄형 리타 강사 / 현재 6/10명</p>
            </div>
          </div>
        )}
        {activeTab === '시설 정보' && (
          <div>
            <p className="text-sm">시설 정보 페이지</p>
          </div>
        )}
        {activeTab === '시설 선택' && (
          <div>
            <p className="text-sm">시설 선택 페이지</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PassPage;
