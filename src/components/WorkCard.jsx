import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWorkTypeLabel } from '@/lib/workTypes';
import { resolveProjectImage } from '@/lib/projectImages';
import { fadeUp, viewportOnce } from '@/lib/motion';

const WorkCard = ({ project, index = 0, wide = false, className = '' }) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const external = project.type === 'article' && Boolean(project.mediumUrl);
  const href = external ? project.mediumUrl : `/trabalho/${project.slug}`;
  const excerpt = project.excerpt || project.description || '';
  const meta = [getWorkTypeLabel(project.type, t), project.year].filter(Boolean).join(' · ');
  const tags = (project.technologies || []).slice(0, 4);

  const content = (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.06] ${
          wide ? 'aspect-[16/9] md:aspect-[21/10]' : 'aspect-[16/11]'
        }`}
      >
        <img
          src={resolveProjectImage(project)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 backdrop-blur px-2.5 py-1 text-[0.7rem] tabular-nums text-zinc-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`mt-5 ${wide ? 'md:grid md:grid-cols-2 md:gap-x-10' : ''}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className={`font-display text-paper leading-[1.05] tracking-[-0.035em] ${
                wide ? 'text-[1.7rem] md:text-[2.4rem]' : 'text-[1.4rem] md:text-[1.7rem]'
              }`}
            >
              {project.title}
            </h3>
            {meta && <p className="mt-2 text-sm text-muted">{meta}</p>}
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1.5 shrink-0 text-muted transition-all duration-300 group-hover:text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <div className={wide ? 'mt-4 md:mt-1' : 'mt-3'}>
          {excerpt && (
            <p className="text-sm md:text-[0.95rem] text-zinc-400 leading-relaxed line-clamp-2 max-w-prose">
              {excerpt}
            </p>
          )}
          {tags.length > 0 && (
            <p className="mt-3 text-xs text-muted tracking-wide">{tags.join('  ·  ')}</p>
          )}
        </div>
      </div>
    </>
  );

  const linkClass = 'group block focus:outline-none focus-visible:ring-2 focus-visible:ring-paper/60 rounded-2xl';

  return (
    <motion.article
      className={className}
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: Math.min((index % 3) * 0.08, 0.24) }}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {content}
        </a>
      ) : (
        <Link to={href} className={linkClass}>
          {content}
        </Link>
      )}
    </motion.article>
  );
};

export default WorkCard;
