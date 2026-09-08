
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import ScrollManager from '@/components/ScrollManager';
import HomePage from '@/pages/HomePage';
import ResumePage from '@/pages/ResumePage';
import AdminPage from '@/pages/AdminPage';
import WorkPage from '@/pages/WorkPage';
import WorkDetailPage from '@/pages/WorkDetailPage';
import ArticlesPage from '@/pages/ArticlesPage';
import { useLanguage } from '@/contexts/LanguageContext';

const DocumentHead = () => {
  const { t, language } = useLanguage();
  const htmlLang = language === 'pt' ? 'pt-BR' : language;

  return (
    <Helmet htmlAttributes={{ lang: htmlLang }}>
      <title>{t('siteTitle')}</title>
      <meta name="description" content={t('siteDescription')} />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Syne:wght@500;600;700;800&display=swap" rel="stylesheet" />
    </Helmet>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <DocumentHead />
        
        <BrowserRouter>
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
        </BrowserRouter>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
