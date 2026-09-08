import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWorkTypeLabel } from '@/lib/workTypes';
import { resolveProjectImage } from '@/lib/projectImages';

const WorkCard = ({ project }) => {
  const { t } = useLanguage();
  const href = project.type === 'article' && project.mediumUrl
    ? project.mediumUrl
    : `/trabalho/${project.slug}`;
  const external = project.type === 'article' && Boolean(project.mediumUrl);

  const content = (
    <>
      <img src={resolveProjectImage(project)} alt={project.title} />
      <p className="section-kicker !mb-2">{getWorkTypeLabel(project.type, t)}</p>
      <h3 className="font-serif text-2xl text-paper mb-2">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{project.excerpt || project.description}</p>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="work-card">
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className="work-card">
      {content}
    </Link>
  );
};

export default WorkCard;
