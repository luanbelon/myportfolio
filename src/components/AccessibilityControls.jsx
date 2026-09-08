import React, { useState } from 'react';
import { Accessibility, Plus, Minus, Eye, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, toggleHighContrast, resetAccessibility } = useAccessibility();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="w-12 h-12 rounded-full bg-paper text-ink flex items-center justify-center"
        aria-label={t('accessibilityControls')}
      >
        <Accessibility size={20} />
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 w-52 border border-white/10 bg-ink p-4">
          <p className="text-xs text-muted mb-3">{t('accessibility')}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-paper/80">{t('fontSize')}</span>
            <div className="flex gap-1">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'small'}
                className="w-7 h-7 border border-white/15 text-paper disabled:opacity-40"
                aria-label={t('decreaseFontSize')}
              >
                <Minus size={12} className="mx-auto" />
              </button>
              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'large'}
                className="w-7 h-7 border border-white/15 text-paper disabled:opacity-40"
                aria-label={t('increaseFontSize')}
              >
                <Plus size={12} className="mx-auto" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-paper/80">{t('highContrast')}</span>
            <button
              onClick={toggleHighContrast}
              className={`w-7 h-7 border flex items-center justify-center ${
                highContrast ? 'bg-paper text-ink border-paper' : 'border-white/15 text-paper'
              }`}
              aria-label={t('toggleHighContrast')}
            >
              <Eye size={12} />
            </button>
          </div>
          <button
            onClick={resetAccessibility}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm text-paper/80 border border-white/10"
          >
            <RotateCcw size={12} />
            {t('reset')}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityControls;
