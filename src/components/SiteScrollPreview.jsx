import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProjectImage } from '@/lib/projectImages';

const SiteScrollPreview = ({ project, alt = '' }) => {
  const { t } = useLanguage();
  const coverSrc = resolveProjectImage(project);
  const fullSrc = project.fullPageImageUrl || '';
  const scrollSrc = fullSrc || coverSrc;
  const canScroll = Boolean(fullSrc);

  const frameRef = useRef(null);
  const [showHint, setShowHint] = useState(canScroll);
  const dragging = useRef(false);
  const lastY = useRef(0);

  useEffect(() => {
    setShowHint(canScroll);
  }, [canScroll, scrollSrc]);

  const hideHint = () => {
    if (showHint) {
      setShowHint(false);
    }
  };

  const onPointerDown = (event) => {
    if (!canScroll) return;
    // Ignore primary button only for mouse; allow touch.
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging.current = true;
    lastY.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!canScroll || !dragging.current || !frameRef.current) return;
    const delta = event.clientY - lastY.current;
    lastY.current = event.clientY;
    frameRef.current.scrollTop -= delta;
    hideHint();
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="relative">
      <div
        ref={frameRef}
        className={`overflow-x-hidden overflow-y-auto rounded-2xl aspect-[16/10] bg-[#111113] overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(244,244,245,0.4)_transparent] ${
          canScroll ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onWheel={hideHint}
        onScroll={hideHint}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role={canScroll ? 'region' : undefined}
        aria-label={canScroll ? t('scrollPageHint') : alt}
        tabIndex={canScroll ? 0 : undefined}
      >
        <img
          src={scrollSrc}
          alt={alt}
          draggable={false}
          className="w-full h-auto max-w-none block pointer-events-none select-none"
        />
      </div>

      {canScroll && showHint && (
        <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white pointer-events-none">
          {t('scrollPageHint')}
        </span>
      )}
    </div>
  );
};

export default SiteScrollPreview;
