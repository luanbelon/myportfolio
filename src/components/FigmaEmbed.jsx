import React from 'react';
import { toFigmaEmbedUrl } from '@/lib/workTypes';

const FigmaEmbed = ({ url, title = 'Figma' }) => {
  if (!url) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-[#111113]">
      <iframe
        title={title}
        src={toFigmaEmbedUrl(url)}
        className="w-full h-[70vh] min-h-[420px]"
        allowFullScreen
      />
    </div>
  );
};

export default FigmaEmbed;
