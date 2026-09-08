import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const CONTACT_SCROLL_KEY = 'scroll-to-contact';

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const shouldGoToContact = sessionStorage.getItem(CONTACT_SCROLL_KEY) === '1';

    if (shouldGoToContact && pathname === '/') {
      sessionStorage.removeItem(CONTACT_SCROLL_KEY);
      const timer = window.setTimeout(() => {
        document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => window.clearTimeout(timer);
    }

    if (hash) {
      window.history.replaceState(null, '', pathname || '/');
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
