import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRouter from './routes/AdminRouter';
import CenterRouter from './routes/CenterRouter';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />

        {/* 관리자 전용 라우트 */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRouter />
            </ProtectedRoute>
          }
        />
        {/* 관리자 전용 라우트 */}
        <Route
          path="/center/*"
          element={
            <ProtectedRoute>
              <CenterRouter />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/select-role" />} />
      </Routes>
    </Router>
  );
};

export default App;
