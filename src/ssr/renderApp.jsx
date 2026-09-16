import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import AppRoutes from '@/app/AppRoutes';

export function renderPage(url, language = 'pt') {
  const app = (
    <LanguageProvider initialLanguage={language} ssr>
      <AccessibilityProvider>
        <MotionConfig reducedMotion="always">
          <MemoryRouter initialEntries={[url]}>
            <AppRoutes />
          </MemoryRouter>
        </MotionConfig>
      </AccessibilityProvider>
    </LanguageProvider>
  );

  const appHtml = renderToString(app);
  const helmet = Helmet.renderStatic();

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('');

  return { appHtml, headTags };
}
