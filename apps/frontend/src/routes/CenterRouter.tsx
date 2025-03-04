import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CenterMembersPage from '../pages/center/CenterRegisterMemberPage';
import CenterHomePage from '../pages/center/CenterHomePage';
import PageLayout from '../components/PageLayout';

const CenterRouter: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/register-member" element={<CenterMembersPage />} />
        <Route path="/" element={<CenterHomePage />} />
      </Routes>
    </PageLayout>
  );
};

export default CenterRouter;
