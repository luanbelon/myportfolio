import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchProjects } from '@/lib/api';
import WorkList from '@/components/WorkList';
import Reveal from '@/components/Reveal';

const RecentArticles = () => {
  const { t, language } = useLanguage();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchProjects(language, { type: 'article' })
      .then((data) => {
        if (mounted) {
          setArticles((data || []).slice(0, 4));
        }
      })
      .catch(() => {
        if (mounted) {
          setArticles([]);
        }
      });
    return () => {
      mounted = false;
    };
  }, [language]);

  if (!articles.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <Reveal className="flex items-end justify-between gap-6 mb-4">
          <h2 className="section-title mb-0">{t('recentWriting')}</h2>
          <Link to="/artigos" className="inline-flex items-center gap-1 text-sm text-muted hover:text-paper mb-2">
            {t('articlesTitle')}
            <ArrowUpRight size={14} />
          </Link>
        </Reveal>
        <WorkList projects={articles} numbered={false} />
      </div>
    </section>
  );
};

export default RecentArticles;
