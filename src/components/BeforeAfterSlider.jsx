import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function readImageSize(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const image = new Image();
    image.onload = () => {
      resolve({
        width: image.naturalWidth || 1,
        height: image.naturalHeight || 1,
      });
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt = '' }) => {
  const { t } = useLanguage();
  const [position, setPosition] = useState(50);
  const [aspectRatio, setAspectRatio] = useState(16 / 10);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([readImageSize(beforeSrc), readImageSize(afterSrc)]).then(([before, after]) => {
      if (cancelled) return;
      const ratios = [before, after]
        .filter(Boolean)
        .map((size) => size.height / size.width);
      if (!ratios.length) return;
      // Frame height matches the taller image when both are scaled to the same width.
      const tallestRatio = Math.max(...ratios);
      setAspectRatio(1 / tallestRatio);
    });

    return () => {
      cancelled = true;
    };
  }, [beforeSrc, afterSrc]);

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
    <div
      ref={frameRef}
      className="relative w-full overflow-hidden rounded-2xl bg-[#111113] touch-none cursor-ew-resize select-none"
      style={{ aspectRatio }}
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

      <span className="absolute left-4 top-4 z-20 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white pointer-events-none shadow-sm">
        {t('beforeLabel')}
      </span>
      <span className="absolute right-4 top-4 z-20 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white pointer-events-none shadow-sm">
        {t('afterLabel')}
      </span>

      <div
        className="absolute inset-y-0 z-10 -translate-x-1/2 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111] shadow-lg">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M6.5 4.5 2.5 9l4 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.5 4.5 15.5 9l-4 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min="2"
        max="98"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="sr-only"
        aria-label={`${t('beforeLabel')} / ${t('afterLabel')}`}
      />
    </div>
  );
};

export default BeforeAfterSlider;
