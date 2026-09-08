import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="text-[0.92rem] text-zinc-400 hover:text-paper"
        aria-label={t('languageLabel')}
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[72px] bg-ink border border-white/10 rounded-xl overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm ${
                  language === lang.code ? 'text-paper' : 'text-zinc-400 hover:text-paper'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;
