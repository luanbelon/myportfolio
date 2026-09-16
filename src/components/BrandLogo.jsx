import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/imgs/logo-luan-belon.png';

const BrandLogo = ({ className = '', to = '/' }) => {
  const image = (
    <img
      src={logo}
      alt="Luan Belon"
      width={180}
      height={36}
      className={`h-7 md:h-8 w-auto object-contain object-left ${className}`}
      decoding="async"
    />
  );

  if (to === false) {
    return image;
  }

  return (
    <Link to={to} className="inline-flex items-center shrink-0" aria-label="Luan Belon — Home">
      {image}
    </Link>
  );
};

export default BrandLogo;
