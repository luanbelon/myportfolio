import { FREELANCER_URL, GITHUB_URL, LINKEDIN_URL } from '@/lib/links';
import { absoluteUrl, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import { getTranslation } from '@/contexts/LanguageContext';

const KNOWS_ABOUT = [
  'Frontend Development',
  'Angular',
  'TypeScript',
  'JavaScript',
  'WordPress',
  'UX Design',
  'UI Design',
  'Web Accessibility',
  'Responsive Web Design',
  'E-commerce',
];

function jobTitlesForLanguage(language) {
  const subtitle = getTranslation(language, 'heroSubtitle');
  if (language === 'pt') {
    return ['Engenheiro Frontend Pleno', 'UX/UI Designer'];
  }
  if (language === 'es') {
    return ['Ingeniero Frontend Pleno', 'Diseñador UX/UI'];
  }
  if (language === 'de') {
    return ['Frontend-Ingenieur', 'UX/UI Designer'];
  }
  return ['Frontend Engineer', 'UX/UI Designer'];
}

export function buildPersonNode(t, language) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    alternateName: 'Luan Santos',
    jobTitle: jobTitlesForLanguage(language),
    description: t('geoIntro'),
    url: `${SITE_URL}/`,
    email: 'mailto:luanbelon@gmail.com',
    image: DEFAULT_OG_IMAGE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Salvador',
      addressRegion: 'Bahia',
      addressCountry: 'BR',
    },
    knowsAbout: KNOWS_ABOUT,
    sameAs: [LINKEDIN_URL, GITHUB_URL, FREELANCER_URL],
    worksFor: {
      '@type': 'Organization',
      name: 'Netra Tecnologia',
    },
    mainEntityOfPage: {
      '@id': `${SITE_URL}/#profile`,
    },
  };
}

export function buildHomeGraph(t, language) {
  return buildHomeGraphForLang(language, t);
}

export function buildHomeGraphForLang(language, t = (key) => getTranslation(language, key)) {
  const inLanguage = language === 'pt' ? 'pt-BR' : language;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: t('siteDescription'),
        inLanguage: ['pt-BR', 'en', 'es', 'de'],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: t('siteTitle'),
        description: t('siteDescription'),
        inLanguage,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      buildPersonNode(t, language),
    ],
  };
}

export function buildWebPageSchema({ name, description, path, language }) {
  const inLanguage = language === 'pt' ? 'pt-BR' : language;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    inLanguage,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
  };
}

export function buildCreativeWorkSchema(project, t) {
  const description = project.excerpt || project.description || t('siteDescription');

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url: absoluteUrl(`/trabalho/${project.slug}`),
    creator: { '@id': `${SITE_URL}/#person` },
    ...(project.year ? { datePublished: `${project.year}-01-01` } : {}),
    ...(project.client ? { contributor: { '@type': 'Organization', name: project.client } } : {}),
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
