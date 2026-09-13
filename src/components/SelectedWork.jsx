import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProjects } from '@/lib/api';
import { featuredFallback } from '@/lib/fallbackProjects';
import WorkGrid from '@/components/WorkGrid';
import Reveal from '@/components/Reveal';

const MAX_ITEMS = 4;

const SelectedWork = () => {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState(() => featuredFallback().slice(0, MAX_ITEMS));

  useEffect(() => {
    let mounted = true;
    fetchProjects(language, { featured: true })
      .then((data) => {
        if (!mounted) return;
        const list = (data || []).filter((item) => item.type !== 'article').slice(0, MAX_ITEMS);
        if (list.length) {
          setProjects(list);
        }
      })
      .catch(() => {
        // keep fallback
      });
    return () => {
      mounted = false;
    };
  }, [language]);

  return (
    <section id="trabalho" className="section">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <h2 className="section-title">{t('selectedWork')}</h2>
            <p className="section-lead">{t('selectedWorkLead')}</p>
          </div>
          <Link
            to="/trabalho"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-paper mb-1"
          >
            {t('viewAllWork')}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>

        <WorkGrid projects={projects} />
      </div>
    </section>
  );
};

export default SelectedWork;
