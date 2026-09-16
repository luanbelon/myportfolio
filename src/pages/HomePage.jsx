import React, { useMemo } from 'react';
import SiteLayout from '@/components/SiteLayout';
import SeoHead from '@/components/SeoHead';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Testimonials from '@/components/Testimonials';
import RecentArticles from '@/components/RecentArticles';
import Contact from '@/components/Contact';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildHomeGraph } from '@/lib/structuredData';

const HomePage = () => {
  const { t, language } = useLanguage();
  const jsonLd = useMemo(() => [buildHomeGraph(t, language)], [t, language]);

  return (
    <SiteLayout>
      <SeoHead
        title={t('siteTitle')}
        description={t('siteDescription')}
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <SelectedWork />
      <About />
      <Expertise />
      <Testimonials />
      <RecentArticles />
      <Contact />
    </SiteLayout>
  );
};

export default HomePage;
