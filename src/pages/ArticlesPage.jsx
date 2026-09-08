import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SiteLayout from '@/components/SiteLayout';
import WorkList from '@/components/WorkList';
import { fetchProjects } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

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

  return (
    <SiteLayout>
      <Helmet>
        <title>{t('articlesTitle')} — Luan Belon</title>
      </Helmet>
      <section className="pt-32 pb-24">
        <div className="container">
          <h1 className="section-title">{t('articlesTitle')}</h1>
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
