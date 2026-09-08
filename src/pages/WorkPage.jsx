import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import SiteLayout from '@/components/SiteLayout';
import WorkList from '@/components/WorkList';
import { fetchProjects } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/fallbackProjects';
import { WORK_TYPES } from '@/lib/workTypes';
import { useLanguage } from '@/contexts/LanguageContext';

const WorkPage = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  useEffect(() => {
    let mounted = true;
    fetchProjects(language)
      .then((data) => {
        if (!mounted) return;
        const list = (data || []).filter((item) => item.type !== 'article');
        setProjects(list.length ? list : FALLBACK_PROJECTS);
      })
      .catch(() => {
        if (mounted) {
          setProjects(FALLBACK_PROJECTS);
        }
      });
    return () => {
      mounted = false;
    };
  }, [language]);

  const filters = useMemo(
    () => [{ value: 'all', label: t('all') }, ...WORK_TYPES.filter((type) => type.value !== 'article')],
    [t]
  );

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.type === activeFilter);

  return (
    <SiteLayout>
      <Helmet>
        <title>{t('workTitle')} — Luan Belon</title>
      </Helmet>
      <section className="pt-28 md:pt-32 pb-24 md:pb-32">
        <div className="container">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h1 className="text-sm text-muted font-normal">{t('workTitle')}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`text-sm ${
                    activeFilter === filter.value ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {filter.label || t(filter.labelKey)}
                </button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="text-muted pt-8">{t('emptyWork')}</p>
          ) : (
            <WorkList projects={filtered} />
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default WorkPage;
