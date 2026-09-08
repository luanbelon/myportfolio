import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt = '' }) => {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);

  if (!beforeSrc || !afterSrc) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#111113]">
        <img src={afterSrc} alt={`${t('afterLabel')} ${alt}`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={beforeSrc}
            alt={`${t('beforeLabel')} ${alt}`}
            className="absolute left-0 top-0 h-full max-w-none object-cover"
            style={{ width: `${(100 / position) * 100}%` }}
          />
        </div>
        <div className="absolute inset-y-0 w-px bg-paper" style={{ left: `${position}%` }} />
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{t('beforeLabel')}</span>
        <input
          type="range"
          min="2"
          max="98"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="flex-1 mx-4 accent-[#f4f4f5]"
          aria-label={`${t('beforeLabel')} / ${t('afterLabel')}`}
        />
        <span>{t('afterLabel')}</span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
