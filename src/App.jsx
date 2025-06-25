
import React from 'react';
import { Helmet } from 'react-helmet';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <Helmet>
          <title>Luan Santos - Desenvolvedor Front-end & UX Designer</title>
          <meta name="description" content="Portfolio de Luan Santos - Analista de Sistemas, Desenvolvedor Front-end e UX Designer especializado em React, Angular, WordPress e design de experiência do usuário." />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Helmet>
        
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
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
