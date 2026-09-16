import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWorkTypeLabel } from '@/lib/workTypes';
import { fadeUp, viewportOnce } from '@/lib/motion';

const WorkList = ({ projects = [], numbered = true }) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <ul>
      {projects.map((project, index) => {
        const href = project.type === 'article' && project.mediumUrl
          ? project.mediumUrl
          : `/trabalho/${project.slug}`;
        const external = project.type === 'article' && Boolean(project.mediumUrl);
        const className =
          'group grid grid-cols-[2.75rem_1fr_auto] md:grid-cols-[4rem_1fr_auto_auto] items-baseline gap-x-3 md:gap-x-6 py-6 md:py-8 border-t border-white/[0.08] last:border-b';

        const inner = (
          <>
            <span className="text-[0.8rem] tabular-nums text-muted">
              {numbered ? String(index + 1).padStart(2, '0') : '—'}
            </span>
            <span className="font-display text-[1.65rem] md:text-[2.55rem] leading-[1.08] tracking-[-0.045em] text-paper transition-transform duration-500 ease-out group-hover:translate-x-1">
              {project.title}
            </span>
            <span className="hidden md:block text-sm text-muted">
              {getWorkTypeLabel(project.type, t)}
            </span>
            <span className="text-muted transition-colors duration-300 group-hover:text-paper">
              <ArrowUpRight size={16} />
            </span>
          </>
        );

        return (
          <motion.li
            key={project.id}
            variants={fadeUp}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: Math.min(index * 0.05, 0.28) }}
          >
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            ) : (
              <Link to={href} className={className}>
                {inner}
              </Link>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default WorkList;
