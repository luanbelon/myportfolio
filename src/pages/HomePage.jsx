import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import RecentArticles from '@/components/RecentArticles';
import Contact from '@/components/Contact';

const HomePage = () => {
  return (
    <SiteLayout>
      <Hero />
      <SelectedWork />
      <About />
      <Testimonials />
      <RecentArticles />
      <Contact />
    </SiteLayout>
  );
};

export default HomePage;
