import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';

const Expertise = () => {
  const { t } = useLanguage();

  const items = [
    { titleKey: 'expSkill1Title', descKey: 'expSkill1Desc' },
    { titleKey: 'expSkill2Title', descKey: 'expSkill2Desc' },
    { titleKey: 'expSkill3Title', descKey: 'expSkill3Desc' },
    { titleKey: 'expSkill4Title', descKey: 'expSkill4Desc' },
    { titleKey: 'expSkill5Title', descKey: 'expSkill5Desc' },
  ];

  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <Reveal>
          <h2 id="expertise-title" className="section-title mb-4 md:mb-6">{t('expertiseTitle')}</h2>
          <p className="section-lead mb-10 md:mb-12">{t('expertiseLead')}</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {items.map((item, index) => (
            <Reveal key={item.titleKey} delay={index * 0.04}>
              <article>
                <h3 className="font-display text-xl tracking-tight text-paper mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(item.descKey)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
