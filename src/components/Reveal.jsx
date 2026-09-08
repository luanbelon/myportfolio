import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

const Reveal = ({ children, className = '', delay = 0 }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
