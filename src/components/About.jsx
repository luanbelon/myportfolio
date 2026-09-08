import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';

const About = () => {
  const { t } = useLanguage();

  const proofs = [
    { value: '8+', label: t('proofYears') },
    { value: '47', label: t('proofReviews') },
    { value: '5.0', label: t('proofRating') },
    { value: 'MBA', label: t('proofMba') },
  ];

  const skillCategories = [
    {
      title: t('frontendDev'),
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Next.js'],
    },
    {
      title: t('designUx'),
      skills: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'InDesign', t('research')],
    },
    {
      title: t('cmsEcommerce'),
      skills: ['WordPress', 'Elementor', 'WooCommerce', 'SEO'],
    },
  ];

  const jobs = [
    { period: `2022 — ${t('present')}`, company: 'Netra Tecnologia', role: t('exp1_role'), description: t('exp1_desc') },
    { period: `2017 — ${t('present')}`, company: 'Freelancer.com', role: t('exp2_role'), description: t('exp2_desc') },
    { period: '2021 — 2024', company: 'Fitarias', role: t('exp3_role'), description: t('exp3_desc') },
    { period: '2018 — 2021', company: 'Agência Oito', role: t('exp4_role'), description: t('exp4_desc') },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title mb-8 md:mb-10">{t('aboutTitle')}</h2>
        </Reveal>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <Reveal className="lg:col-span-5">
            <p className="section-lead">{t('aboutLead')}</p>
            <div className="space-y-6 mt-10">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <p className="text-paper mb-2">{category.title}</p>
                  <p className="text-sm text-muted leading-relaxed">{category.skills.join(', ')}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-10">
              {proofs.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-3xl md:text-4xl tracking-tight">{item.value}</p>
                  <p className="text-sm text-muted mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-8">
            {jobs.map((job, index) => (
              <Reveal key={`${job.company}-${job.period}`} delay={index * 0.04}>
                <div className="grid sm:grid-cols-[6.5rem_1fr] gap-3">
                  <p className="text-sm text-muted tabular-nums pt-1">{job.period}</p>
                  <div>
                    <p className="font-display text-xl tracking-tight">{job.role}</p>
                    <p className="text-sm text-zinc-400 mt-1">{job.company}</p>
                    <p className="text-sm text-muted mt-2">{job.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
