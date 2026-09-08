import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Toaster } from '@/components/ui/toaster';

const SiteLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <AccessibilityControls />
      <Header />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
};

export default SiteLayout;
