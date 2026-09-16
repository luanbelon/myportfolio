import React, { useEffect, useState } from 'react';
import SiteLayout from '@/components/SiteLayout';
import SeoHead from '@/components/SeoHead';
import WorkList from '@/components/WorkList';
import { fetchProjects } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildWebPageSchema } from '@/lib/structuredData';

const ArticlesPage = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProjects(language, { type: 'article' })
      .then((data) => {
        if (mounted) {
          setArticles(data || []);
        }
      })
      .catch(() => {
        if (mounted) {
          setArticles([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [language]);

  const pageTitle = `${t('articlesTitle')} — Luan Belon`;

  return (
    <SiteLayout>
      <SeoHead
        title={pageTitle}
        description={t('articlesLead')}
        path="/artigos"
        jsonLd={[buildWebPageSchema({
          name: pageTitle,
          description: t('articlesLead'),
          path: '/artigos',
          language,
        })]}
      />
      <section className="pt-32 pb-24" aria-labelledby="articles-page-title">
        <div className="container">
          <h1 id="articles-page-title" className="section-title">{t('articlesTitle')}</h1>
          <p className="section-lead mb-10">{t('articlesLead')}</p>
          {loading ? (
            <p className="text-muted">{t('articlesTitle')}…</p>
          ) : articles.length === 0 ? (
            <p className="text-muted">{t('emptyArticles')}</p>
          ) : (
            <WorkList projects={articles} numbered={false} />
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default ArticlesPage;
