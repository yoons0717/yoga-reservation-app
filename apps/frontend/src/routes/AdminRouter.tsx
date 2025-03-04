import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHomePage from '../pages/admin/AdminHomePage';
import AdminRegisterCenter from '../pages/admin/AdminRegisterCenter';
import PageLayout from '../components/PageLayout';

const AdminRouter: React.FC = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/register-center" element={<AdminRegisterCenter />} />
        <Route path="/" element={<AdminHomePage />} />
        {/* 필요에 따라 다른 관리자 페이지 추가 */}
        <Route path="*" element={<AdminHomePage />} />
      </Routes>
    </PageLayout>
  );
};

export default AdminRouter;
