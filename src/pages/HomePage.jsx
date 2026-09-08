import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import RecentArticles from '@/components/RecentArticles';
import Contact from '@/components/Contact';

const HomePage = () => {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Testimonials />
      <RecentArticles />
      <Contact />
    </SiteLayout>
  );
};

export default HomePage;
