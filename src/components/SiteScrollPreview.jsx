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

  // Slower pace: ~90px per second, clamped between 6s and 18s.
  const duration = Math.min(18, Math.max(6, travel / 90));

  return (
    <div className="relative">
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-[#111113]"
        onMouseEnter={() => canScroll && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        role={canScroll ? 'img' : undefined}
        aria-label={canScroll ? t('scrollPageHint') : alt}
      >
        <img
          ref={imageRef}
          src={scrollSrc}
          alt={alt}
          draggable={false}
          className="w-full h-auto max-w-none block will-change-transform"
          style={{
            transform: hovering && canScroll
              ? `translate3d(0, -${travel}px, 0)`
              : 'translate3d(0, 0, 0)',
            transition: `transform ${hovering ? duration : 1.4}s cubic-bezier(0.33, 0, 0.2, 1)`,
          }}
        />

        {canScroll && !hovering && (
          <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white pointer-events-none">
            {t('scrollPageHint')}
          </span>
        )}
      </div>
    </div>
  );
};

export default SiteScrollPreview;
