export const WORK_TYPES = [
  { value: 'website', labelKey: 'typeWebsite' },
  { value: 'before_after', labelKey: 'typeBeforeAfter' },
  { value: 'layout', labelKey: 'typeLayout' },
  { value: 'case_study', labelKey: 'typeCaseStudy' },
  { value: 'prototype', labelKey: 'typePrototype' },
  { value: 'article', labelKey: 'typeArticle' },
];

export const WORK_TYPE_VALUES = WORK_TYPES.map((type) => type.value);

export function getWorkTypeLabel(type, t) {
  const match = WORK_TYPES.find((item) => item.value === type);
  return match ? t(match.labelKey) : type;
}

export function toFigmaEmbedUrl(url) {
  if (!url) {
    return '';
  }
  if (url.includes('/embed')) {
    return url;
  }
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}
