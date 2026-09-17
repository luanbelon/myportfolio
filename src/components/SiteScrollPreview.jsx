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
  const imageRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      const image = imageRef.current;
      if (!frame || !image) return;
      setTravel(Math.max(0, image.offsetHeight - frame.clientHeight));
    };

    measure();
    const image = imageRef.current;
    if (image?.complete) {
      measure();
    } else {
      image?.addEventListener('load', measure);
    }
    window.addEventListener('resize', measure);
    return () => {
      image?.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
    };
  }, [scrollSrc]);

  const active = canScroll && (hovering || pinned);
  const duration = Math.min(14, Math.max(4, travel / 160));

  return (
    <div className="space-y-3">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#111113] group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => {
          if (canScroll) {
            setPinned((value) => !value);
          }
        }}
        role={canScroll ? 'button' : undefined}
        tabIndex={canScroll ? 0 : undefined}
        onKeyDown={(event) => {
          if (!canScroll) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setPinned((value) => !value);
          }
        }}
        aria-label={canScroll ? t('scrollPageHint') : alt}
      >
        <img
          ref={imageRef}
          src={scrollSrc}
          alt={alt}
          draggable={false}
          className="w-full h-auto max-w-none block will-change-transform"
          style={{
            transform: active ? `translate3d(0, -${travel}px, 0)` : 'translate3d(0, 0, 0)',
            transition: `transform ${active ? duration : 1.15}s cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        />

        {canScroll && !active && (
          <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white pointer-events-none">
            {t('scrollPageHint')}
          </span>
        )}
      </div>
    </div>
  );
};

export default SiteScrollPreview;
