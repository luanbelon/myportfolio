import React, { useEffect, useMemo, useState } from 'react';
import SiteLayout from '@/components/SiteLayout';
import WorkGrid from '@/components/WorkGrid';
import { fetchProjects } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/fallbackProjects';
import { WORK_TYPES } from '@/lib/workTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import SeoHead from '@/components/SeoHead';
import { buildWebPageSchema } from '@/lib/structuredData';

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

  // Only offer filters for types that actually have projects.
  const filters = useMemo(() => {
    const present = new Set(projects.map((project) => project.type));
    return [
      { value: 'all', label: t('all'), count: projects.length },
      ...WORK_TYPES
        .filter((type) => type.value !== 'article' && present.has(type.value))
        .map((type) => ({
          value: type.value,
          label: t(type.labelKey),
          count: projects.filter((project) => project.type === type.value).length,
        })),
    ];
  }, [projects, t]);

  useEffect(() => {
    if (!filters.some((filter) => filter.value === activeFilter)) {
      setActiveFilter('all');
    }
  }, [filters, activeFilter]);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.type === activeFilter);

  const pageTitle = `${t('workTitle')} — Luan Belon`;
  const pageDescription = `${t('workLead')} ${t('availability')}.`;

  return (
    <SiteLayout>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        path="/trabalho"
        jsonLd={[buildWebPageSchema({
          name: pageTitle,
          description: pageDescription,
          path: '/trabalho',
          language,
        })]}
      />
      <section className="pt-28 md:pt-36 pb-24 md:pb-32" aria-labelledby="work-page-title">
        <div className="container">
          <header className="mb-12 md:mb-16">
            <h1 id="work-page-title" className="section-title">{t('workTitle')}</h1>
            <p className="section-lead">{t('workLead')}</p>

            <div
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5"
              role="tablist"
              aria-label={t('workTitle')}
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`inline-flex items-baseline gap-1.5 text-sm transition-colors ${
                      isActive ? 'text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    <span className={isActive ? 'border-b border-paper pb-0.5' : 'border-b border-transparent pb-0.5'}>
                      {filter.label}
                    </span>
                    <span className="text-[0.7rem] tabular-nums text-muted">{filter.count}</span>
                  </button>
                );
              })}
            </div>
          </header>

          {filtered.length === 0 ? (
            <p className="text-muted pt-8">{t('emptyWork')}</p>
          ) : (
            <div key={activeFilter}>
              <WorkGrid projects={filtered} editorial />
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default WorkPage;
