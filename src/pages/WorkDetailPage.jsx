import React, { useEffect, useMemo, useState } from 'react';
import SeoHead from '@/components/SeoHead';
import { DEFAULT_OG_IMAGE } from '@/lib/site';
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
} from '@/lib/structuredData';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FigmaEmbed from '@/components/FigmaEmbed';
import ImageGallery from '@/components/ImageGallery';
import { fetchProjectBySlug } from '@/lib/api';
import { getStaticWorkProject } from '@/lib/staticWorkProjects';
import { resolveProjectImage } from '@/lib/projectImages';
import { getWorkTypeLabel } from '@/lib/workTypes';
import { useLanguage } from '@/contexts/LanguageContext';
import { easeOut } from '@/lib/motion';

const WorkDetailPage = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [project, setProject] = useState(() => getStaticWorkProject(slug));
  const [error, setError] = useState('');

  useEffect(() => {
    setProject(getStaticWorkProject(slug));
    let mounted = true;
    fetchProjectBySlug(slug, language)
      .then((data) => {
        if (mounted && data) {
          setProject(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setError(t('emptyWork'));
        }
      });
    return () => {
      mounted = false;
    };
  }, [slug, language, t]);

  const seo = useMemo(() => {
    if (!project) {
      const fallbackTitle = `${t('workTitle')} — Luan Belon`;
      return {
        title: fallbackTitle,
        description: t('siteDescription'),
        path: `/trabalho/${slug}`,
        image: DEFAULT_OG_IMAGE,
        jsonLd: [],
      };
    }

    const title = `${project.title} — Luan Belon`;
    const description = (project.excerpt || project.description || t('siteDescription')).trim();
    const path = `/trabalho/${project.slug}`;
    const image = project.imageUrl?.startsWith('http') ? project.imageUrl : DEFAULT_OG_IMAGE;

    return {
      title,
      description,
      path,
      image,
      jsonLd: [
        buildCreativeWorkSchema(project, t),
        buildBreadcrumbSchema([
          { name: t('workTitle'), path: '/trabalho' },
          { name: project.title, path },
        ]),
      ],
    };
  }, [project, slug, t]);

  return (
    <SiteLayout>
      <SeoHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
        image={seo.image}
        jsonLd={seo.jsonLd}
      />
      <article className="pt-32 pb-24">
        <div className="container">
          <Link to="/trabalho" className="text-sm text-muted hover:text-paper">
            {t('backToWork')}
          </Link>

          {error && <p className="mt-10 text-muted">{error}</p>}

          {project && (
            <motion.div
              className="mt-8 space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <header className="grid lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="text-sm text-muted mb-4">{getWorkTypeLabel(project.type, t)}</p>
                  <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,5.5rem)] tracking-[-0.045em] leading-[0.95]">
                    {project.title}
                  </h1>
                </div>
                {project.excerpt && project.excerpt !== project.description && (
                  <p className="lg:col-span-4 text-muted lg:text-right lg:pb-2">
                    {project.excerpt}
                  </p>
                )}
              </header>

              <dl className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
                {project.year && (
                  <div>
                    <dt className="text-muted">{t('yearLabel')}</dt>
                    <dd>{project.year}</dd>
                  </div>
                )}
                {project.client && (
                  <div>
                    <dt className="text-muted">{t('clientLabel')}</dt>
                    <dd>{project.client}</dd>
                  </div>
                )}
                {project.role && (
                  <div>
                    <dt className="text-muted">{t('roleLabel')}</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
              </dl>

              <div className="flex flex-wrap gap-4 text-sm">
                {project.live && project.type === 'website' && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="border-b border-paper/40 pb-0.5 hover:border-paper">
                    {t('liveSite')}
                  </a>
                )}
                {project.figmaUrl && (
                  <a href={project.figmaUrl} target="_blank" rel="noopener noreferrer" className="border-b border-paper/40 pb-0.5 hover:border-paper">
                    {t('openFigma')}
                  </a>
                )}
                {project.mediumUrl && (
                  <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="border-b border-paper/40 pb-0.5 hover:border-paper">
                    {t('readOnMedium')}
                  </a>
                )}
              </div>

              {(project.body || project.description) && (
                <div className="text-zinc-300 leading-relaxed whitespace-pre-line max-w-2xl text-lg">
                  {project.body || project.description}
                </div>
              )}

              {(() => {
                const isBeforeAfter = project.type === 'before_after';
                const beforeSrc = project.beforeImageUrl || (isBeforeAfter ? project.gallery?.[0] : null);
                const afterSrc = project.afterImageUrl
                  || (isBeforeAfter ? (project.gallery?.[1] || project.imageUrl) : null);
                const canCompare = Boolean(beforeSrc && afterSrc && beforeSrc !== afterSrc);

                if (isBeforeAfter && canCompare) {
                  return (
                    <BeforeAfterSlider
                      beforeSrc={beforeSrc}
                      afterSrc={afterSrc}
                      alt={project.title}
                    />
                  );
                }

                return (
                  <img
                    src={resolveProjectImage(project)}
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover object-top rounded-2xl"
                  />
                );
              })()}

              {(project.type === 'website' || project.type === 'layout') && (
                <ImageGallery images={project.gallery} alt={project.title} />
              )}

              {(project.type === 'prototype' || (project.type === 'case_study' && project.figmaUrl)) && (
                <div>
                  <p className="text-sm text-muted mb-4">{t('prototypeLabel')}</p>
                  <FigmaEmbed url={project.figmaUrl || project.live} title={project.title} />
                </div>
              )}

              {project.technologies?.length > 0 && (
                <p className="text-sm text-muted">{project.technologies.join('  ·  ')}</p>
              )}
            </motion.div>
          )}
        </div>
      </article>
    </SiteLayout>
  );
};

export default WorkDetailPage;
