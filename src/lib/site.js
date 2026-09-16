export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.luanbelondev.com').replace(/\/$/, '');

export const SITE_NAME = 'Luan Belon';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.png`;

export function absoluteUrl(path = '/') {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localeFromLanguage(language) {
  if (language === 'pt') return 'pt_BR';
  if (language === 'de') return 'de_DE';
  if (language === 'es') return 'es_ES';
  return 'en_US';
}

export function htmlLangFromLanguage(language) {
  if (language === 'pt') return 'pt-BR';
  return language;
}
