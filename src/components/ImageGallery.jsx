import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ImageGallery = ({ images = [], alt = '' }) => {
  const { t } = useLanguage();
  const list = (images || []).filter(Boolean);

  if (!list.length) {
    return null;
  }

  return (
    <div>
      <p className="text-sm text-muted mb-4">{t('galleryLabel')}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${alt} ${index + 1}`}
            className="w-full aspect-[16/10] object-cover rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
