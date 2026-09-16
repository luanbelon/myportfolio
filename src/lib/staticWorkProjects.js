import { FALLBACK_PROJECTS } from '@/lib/fallbackProjects';

const DETAILS = {
  'sunbeat-energy': {
    excerpt: 'Institutional website for a solar energy company.',
    description: 'Website design and frontend development for Sunbeat Energy.',
  },
  'ecofit-prototipo': {
    excerpt: 'UX/UI prototype for a fitness product.',
    description: 'Interface prototype created in Figma and translated into a web experience.',
  },
  'coleta-facil': {
    excerpt: 'UX/UI case study for a collection management product.',
    description: 'Case study covering research, interface design and frontend implementation.',
  },
  'black-forest-food': {
    excerpt: 'Website for a food brand.',
    description: 'Institutional website with responsive layout and WordPress implementation.',
  },
  'overall-contractors': {
    excerpt: 'Website for a construction company.',
    description: 'Corporate website focused on services, credibility and lead generation.',
  },
  caricoos: {
    excerpt: 'Website for Caricoos.',
    description: 'Web project combining UX/UI design and frontend development.',
  },
};

export function getStaticWorkProject(slug) {
  const base = FALLBACK_PROJECTS.find((project) => project.slug === slug);
  if (!base) {
    return null;
  }

  const detail = DETAILS[slug] || {
    excerpt: `${base.title} — portfolio project by Luan Belon.`,
    description: 'Frontend and UX/UI work by Luan Belon.',
  };

  return {
    ...base,
    ...detail,
  };
}
