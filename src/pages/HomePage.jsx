import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Toaster } from '@/components/ui/toaster';

const HomePage = () => {
  return (
    <div className="portfolio">
      <AccessibilityControls />
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
};

export default HomePage;
