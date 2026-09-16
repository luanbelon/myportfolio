import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  htmlLangFromLanguage,
  localeFromLanguage,
  SITE_NAME,
} from '@/lib/site';

const SeoHead = ({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  jsonLd = [],
  noindex = false,
}) => {
  const { language } = useLanguage();
  const canonical = absoluteUrl(path);
  const htmlLang = htmlLangFromLanguage(language);
  const ogLocale = localeFromLanguage(language);

  const jsonLdScripts = useMemo(() => {
    return jsonLd.filter(Boolean).map((data, index) => (
      <script key={`jsonld-${index}`} type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    ));
  }, [jsonLd]);

  return (
    <Helmet htmlAttributes={{ lang: htmlLang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdScripts}
    </Helmet>
  );
};

export default SeoHead;
