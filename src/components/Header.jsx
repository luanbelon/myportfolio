import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import BrandLogo from '@/components/BrandLogo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTACT_SCROLL_KEY } from '@/components/ScrollManager';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { to: '/trabalho', label: t('work') },
    { to: '/artigos', label: t('articles') },
    { to: '/curriculo', label: t('resume') },
  ];

  const isActive = (to) => location.pathname.startsWith(to);

  const goToContact = (event) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    sessionStorage.setItem(CONTACT_SCROLL_KEY, '1');
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-colors duration-500 no-print ${
        isScrolled ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="w-full max-w-[1320px] mx-auto px-5 md:px-7 flex items-center justify-between">
        <BrandLogo />

        <div className="hidden md:flex items-center gap-9">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[0.92rem] transition-colors ${
                isActive(item.to) ? 'text-paper' : 'text-zinc-400 hover:text-paper'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={goToContact} className="text-[0.92rem] text-zinc-400 hover:text-paper">
            {t('contact')}
          </button>
          <LanguageToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle />
          <button
            className="text-paper"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={t('menu')}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-ink/95 backdrop-blur-md md:hidden">
          <div className="px-6 py-6 flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-lg text-paper">
                {item.label}
              </Link>
            ))}
            <button type="button" onClick={goToContact} className="text-lg text-paper text-left">
              {t('contact')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
