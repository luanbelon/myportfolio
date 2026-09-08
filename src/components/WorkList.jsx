import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWorkTypeLabel } from '@/lib/workTypes';
import { resolveProjectImage } from '@/lib/projectImages';
import { easeOut, fadeUp, viewportOnce } from '@/lib/motion';

const WorkList = ({ projects = [], numbered = true }) => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);
  const active = projects.find((project) => project.id === activeId) || null;
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="grid lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_340px] gap-x-10 xl:gap-x-16 items-start"
      onMouseLeave={() => setActiveId(null)}
    >
      <ul>
        {projects.map((project, index) => {
          const href = project.type === 'article' && project.mediumUrl
            ? project.mediumUrl
            : `/trabalho/${project.slug}`;
          const external = project.type === 'article' && Boolean(project.mediumUrl);
          const isDimmed = Boolean(activeId) && activeId !== project.id;
          const className = `group grid grid-cols-[2.75rem_1fr_auto] md:grid-cols-[4rem_1fr_auto_auto] items-baseline gap-x-3 md:gap-x-6 py-6 md:py-8 border-t border-white/[0.08] last:border-b transition-opacity duration-500 ${
            isDimmed ? 'opacity-35' : 'opacity-100'
          }`;

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
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  onMouseEnter={() => setActiveId(project.id)}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  to={href}
                  className={className}
                  onMouseEnter={() => setActiveId(project.id)}
                >
                  {inner}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ul>

      <div className="hidden lg:block sticky top-28 h-[380px] xl:h-[420px]">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              className="h-full"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <img
                src={resolveProjectImage(active)}
                alt=""
                className="h-full w-full object-cover rounded-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkList;
