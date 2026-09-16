import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from '@/components/ScrollManager';
import HomePage from '@/pages/HomePage';
import ResumePage from '@/pages/ResumePage';
import AdminPage from '@/pages/AdminPage';
import WorkPage from '@/pages/WorkPage';
import WorkDetailPage from '@/pages/WorkDetailPage';
import ArticlesPage from '@/pages/ArticlesPage';

const AppRoutes = () => (
  <>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trabalho" element={<WorkPage />} />
      <Route path="/trabalho/:slug" element={<WorkDetailPage />} />
      <Route path="/artigos" element={<ArticlesPage />} />
      <Route path="/curriculo" element={<ResumePage />} />
      <Route path="/adm-luan-portfolio" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default AppRoutes;
