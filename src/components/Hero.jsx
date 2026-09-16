import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { easeOut } from '@/lib/motion';
import { FREELANCER_URL } from '@/lib/links';

const Hero = () => {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const roles = t('heroRoles');
  const list = Array.isArray(roles) ? roles : [String(roles)];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [language]);

  useEffect(() => {
    if (reduceMotion || list.length < 2) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % list.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [list.length, reduceMotion, language]);

  return (
    <section
      id="inicio"
      className="min-h-[100svh] flex flex-col justify-center pt-20 pb-12"
    >
      <div className="container">
        <motion.h1
          className="font-display font-semibold tracking-[-0.05em]"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut }}
        >
          <span className="block text-[clamp(4.2rem,14vw,11rem)] leading-[0.86]">
            {t('heroTitle')},
          </span>
          <span className="mt-4 md:mt-5 block overflow-hidden h-[1.12em] text-[clamp(2.1rem,6.8vw,5.25rem)] leading-[1.12] font-medium text-zinc-400">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={list[index]}
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                exit={reduceMotion ? undefined : { y: '-110%' }}
                transition={{ duration: 0.55, ease: easeOut }}
                aria-live="polite"
              >
                {list[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 md:mt-10 max-w-3xl text-lg md:text-xl text-zinc-300 leading-relaxed"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
        >
          {t('geoIntro')}
        </motion.p>
        <motion.p
          className="mt-4 max-w-3xl text-base md:text-lg text-zinc-400 leading-relaxed"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.12 }}
        >
          {t('geoIntroExtended')}
        </motion.p>
        <motion.p
          className="mt-6 md:mt-8 max-w-2xl text-xl md:text-2xl text-zinc-400 leading-relaxed"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.14 }}
        >
          {t('heroManifesto')}
        </motion.p>

        <motion.p
          className="mt-4 text-base md:text-lg text-muted"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
        >
          {t('heroLocation')}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.24 }}
        >
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8">
            <a
              href={FREELANCER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {t('hireMe')}
              <ArrowUpRight size={14} />
            </a>
            <Link
              to="/trabalho"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-paper"
            >
              {t('viewWork')}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
