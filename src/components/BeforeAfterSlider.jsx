import React, { useCallback, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt = '' }) => {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, next)));
  }, []);

  const onPointerDown = (event) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event) => {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  if (!beforeSrc || !afterSrc) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#111113] touch-none cursor-ew-resize select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`${t('beforeLabel')} / ${t('afterLabel')} — ${alt}`}
      >
        <img
          src={afterSrc}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt=""
            draggable={false}
            className="absolute left-0 top-0 h-full max-w-none object-cover object-top"
            style={{ width: `${100 / (position / 100)}%` }}
          />
        </div>
        <div
          className="absolute inset-y-0 z-10 -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div className="h-full w-px bg-paper" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-paper/80 bg-ink/70 backdrop-blur flex items-center justify-center text-paper text-xs tracking-tight">
            ↔
          </div>
        </div>
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
