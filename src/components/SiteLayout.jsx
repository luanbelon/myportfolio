import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Toaster } from '@/components/ui/toaster';
import { useLanguage } from '@/contexts/LanguageContext';

const SiteLayout = ({ children }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <a href="#conteudo" className="skip-link">
        {t('skipToContent')}
      </a>
      <AccessibilityControls />
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default SiteLayout;
