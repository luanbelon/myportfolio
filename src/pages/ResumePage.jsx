import React from 'react';
import { Helmet } from 'react-helmet';
import { Download } from 'lucide-react';
import SiteLayout from '@/components/SiteLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import luanPhoto from '@/assets/imgs/luan.png';
import Reveal from '@/components/Reveal';
import { FREELANCER_URL, GITHUB_URL, LINKEDIN_URL } from '@/lib/links';

const ResumePage = () => {
  const { t } = useLanguage();

  const jobs = [
    { company: 'Netra Tecnologia', period: `2022 — ${t('present')}`, roleKey: 'exp1_role', descKey: 'exp1_desc' },
    { company: 'Freelancer.com', period: `2017 — ${t('present')}`, roleKey: 'exp2_role', descKey: 'exp2_desc' },
    { company: 'Fitarias', period: '2021 — 2024', roleKey: 'exp3_role', descKey: 'exp3_desc' },
    { company: 'Agência Oito', period: '2018 — 2021', roleKey: 'exp4_role', descKey: 'exp4_desc' },
  ];

  const downloadPdf = () => {
    const previousTitle = document.title;
    document.title = t('resumeFileName');
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 500);
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>{t('resume')} — Luan Belon</title>
      </Helmet>

      <main className="pt-32 pb-24 print:hidden">
        <div className="container max-w-3xl">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="flex items-end gap-6 md:gap-8">
              <img
                src={luanPhoto}
                alt="Luan Santos"
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full shrink-0"
              />
              <div>
                <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,4.4rem)] tracking-[-0.045em] leading-[0.95] mb-3">
                  Luan Santos
                </h1>
                <p className="text-muted text-lg">{t('heroSubtitle')}</p>
              </div>
            </div>
            <button type="button" onClick={downloadPdf} className="btn shrink-0">
              <Download size={16} />
              {t('downloadResume')}
            </button>
          </Reveal>

          <section className="grid sm:grid-cols-2 gap-3 text-sm text-zinc-400 mb-14">
            <a href="mailto:luanssantosti@gmail.com" className="hover:text-paper">luanssantosti@gmail.com</a>
            <a href="tel:+5571986406627" className="hover:text-paper">+55 71 98640-6627</a>
            <p>Itapuã, Salvador — Bahia</p>
            <p className="sm:col-span-2">{t('availability')}</p>
            <div className="flex gap-5 sm:col-span-2">
              <a href={FREELANCER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">{t('hireMe')}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub</a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl tracking-tight mb-4">{t('aboutTitle')}</h2>
            <p className="text-zinc-400 leading-relaxed">{t('aboutLead')}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl tracking-tight mb-4">{t('skillsTitle')}</h2>
            <div className="space-y-3 text-sm">
              <p><span className="text-paper">{t('frontendDev')} — </span><span className="text-muted">HTML, CSS, JavaScript, TypeScript, Angular, React, Next.js</span></p>
              <p><span className="text-paper">{t('designUx')} — </span><span className="text-muted">Figma, Adobe XD, Illustrator, Photoshop, InDesign</span></p>
              <p><span className="text-paper">{t('cmsEcommerce')} — </span><span className="text-muted">WordPress, Elementor, WooCommerce, SEO</span></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl tracking-tight mb-6">{t('professionalExperience')}</h2>
            <div className="space-y-8">
              {jobs.map((job) => (
                <div key={job.company}>
                  <h3 className="text-paper">{job.company} — {t(job.roleKey)}</h3>
                  <p className="text-muted text-sm mt-1 mb-2">{job.period}</p>
                  <p className="text-zinc-400 text-sm">{t(job.descKey)}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl tracking-tight mb-4">{t('education')}</h2>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><span className="text-paper">Universidade Anhembi Morumbi</span> — {t('eduMba')} (2020 — 2021)</li>
              <li><span className="text-paper">UNIFACS</span> — {t('eduDegree')} (2015 — 2018)</li>
              <li><span className="text-paper">Cubos Academy</span> — {t('eduCubos')} (2022)</li>
              <li><span className="text-paper">Udacity</span> — {t('eduUdacity')} (2018)</li>
            </ul>
          </section>
        </div>
      </main>

      <div className="resume-sheet">
        <header className="resume-head">
          <img src={luanPhoto} alt="" className="resume-photo" />
          <div>
            <h1>Luan Santos</h1>
            <p className="resume-role">{t('heroSubtitle')}</p>
            <p>Itapuã, Salvador — Bahia</p>
            <p>{t('availability')}</p>
            <p>luanssantosti@gmail.com · +55 71 98640-6627</p>
          </div>
        </header>

        <section>
          <h2>{t('aboutTitle')}</h2>
          <p>{t('aboutLead')}</p>
        </section>

        <section>
          <h2>{t('skillsTitle')}</h2>
          <p><strong>{t('frontendDev')}</strong> — HTML, CSS, JavaScript, TypeScript, Angular, React, Next.js</p>
          <p><strong>{t('designUx')}</strong> — Figma, Adobe XD, Illustrator, Photoshop, InDesign</p>
          <p><strong>{t('cmsEcommerce')}</strong> — WordPress, Elementor, WooCommerce, SEO</p>
        </section>

        <section>
          <h2>{t('professionalExperience')}</h2>
          {jobs.map((job) => (
            <article key={`print-${job.company}`} className="resume-job">
              <div className="resume-job-top">
                <strong>{t(job.roleKey)}</strong>
                <span>{job.period}</span>
              </div>
              <p className="resume-company">{job.company}</p>
              <p>{t(job.descKey)}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>{t('education')}</h2>
          <p>Universidade Anhembi Morumbi — {t('eduMba')} (2020 — 2021)</p>
          <p>UNIFACS — {t('eduDegree')} (2015 — 2018)</p>
          <p>Cubos Academy — {t('eduCubos')} (2022)</p>
          <p>Udacity — {t('eduUdacity')} (2018)</p>
        </section>
      </div>
    </SiteLayout>
  );
};

export default ResumePage;
