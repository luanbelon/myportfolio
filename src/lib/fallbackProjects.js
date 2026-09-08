export const FALLBACK_PROJECTS = [
  {
    id: 'sunbeat-energy',
    slug: 'sunbeat-energy',
    title: 'Sunbeat Energy',
    type: 'website',
    featured: true,
    imageKey: 'sunbeat',
  },
  {
    id: 'ecofit-prototipo',
    slug: 'ecofit-prototipo',
    title: 'Ecofit',
    type: 'prototype',
    featured: true,
    imageKey: 'ecofit',
  },
  {
    id: 'coleta-facil',
    slug: 'coleta-facil',
    title: 'Coleta Fácil',
    type: 'case_study',
    featured: true,
    imageKey: 'coletafacil',
  },
  {
    id: 'black-forest-food',
    slug: 'black-forest-food',
    title: 'Black Forest Food',
    type: 'website',
    featured: true,
    imageKey: 'bffdeli',
  },
  {
    id: 'overall-contractors',
    slug: 'overall-contractors',
    title: 'Overall Contractors',
    type: 'website',
    featured: false,
    imageKey: 'overall',
  },
  {
    id: 'caricoos',
    slug: 'caricoos',
    title: 'Caricoos',
    type: 'website',
    featured: false,
    imageKey: 'caricoos',
  },
];

export function featuredFallback() {
  return FALLBACK_PROJECTS.filter((project) => project.featured);
}
