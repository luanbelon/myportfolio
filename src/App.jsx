
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import HomePage from '@/pages/HomePage';
import ResumePage from '@/pages/ResumePage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <Helmet>
          <title>Luan Belon - Desenvolvedor Front-end & UX Designer</title>
          <meta name="description" content="Portfolio de Luan Belon - Analista de Sistemas, Desenvolvedor Front-end e UX Designer especializado em React, Angular, WordPress e design de experiência do usuário." />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Helmet>
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/curriculo" element={<ResumePage />} />
            <Route path="/adm-luan-portfolio" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
