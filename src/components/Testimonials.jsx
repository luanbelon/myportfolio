import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';
import { easeOut } from '@/lib/motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    { id: 1, name: 'Luis Mariano', company: 'Preach Digital', roleKey: 'roleFounder', testimonial: t('testimonial1') },
    { id: 2, name: 'Mirza Wajahat', company: 'Coztrix', roleKey: 'roleCeo', testimonial: t('testimonial2') },
    { id: 3, name: 'Kingsley', company: 'Security51', roleKey: 'rolePm', testimonial: t('testimonial3') },
    { id: 4, name: 'Renato P.', company: 'Freelancer.com', roleKey: 'roleClient', testimonial: t('testimonial5') },
    { id: 5, name: 'Maria Eduarda', company: 'Mentor Company', roleKey: 'roleFounder', testimonial: t('testimonial4') },
  ];

  const current = testimonials[currentIndex];

  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title mb-8 md:mb-10">{t('testimonialsTitle')}</h2>
        </Reveal>
        <Reveal className="grid lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <blockquote className="font-display text-[1.65rem] md:text-[2.15rem] leading-[1.25] tracking-[-0.03em] text-paper">
                <p>{current.testimonial}</p>
                <footer className="mt-8 text-sm text-muted font-normal tracking-normal">
                  {current.name} — {t(current.roleKey)},{' '}
                  <cite className="not-italic">{current.company}</cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex gap-3 text-sm text-zinc-400">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={index === currentIndex ? 'text-paper' : 'hover:text-paper'}
                aria-label={`${t('goToTestimonial')} ${index + 1}`}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
