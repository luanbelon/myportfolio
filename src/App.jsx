
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import AppRoutes from '@/app/AppRoutes';

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
