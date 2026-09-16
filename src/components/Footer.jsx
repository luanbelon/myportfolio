import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandLogo from '@/components/BrandLogo';
import { FREELANCER_URL } from '@/lib/links';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-10 no-print">
      <div className="container flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted">
        <div className="flex flex-col gap-3">
          <BrandLogo className="h-6 opacity-90" />
          <p>© {new Date().getFullYear()} Luan Belon</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link to="/trabalho" className="hover:text-paper">{t('work')}</Link>
          <Link to="/artigos" className="hover:text-paper">{t('articles')}</Link>
          <Link to="/curriculo" className="hover:text-paper">{t('resume')}</Link>
          <a href={FREELANCER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
            {t('hireMe')}
          </a>
          <a href="mailto:luanbelon@gmail.com" className="hover:text-paper">luanbelon@gmail.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
