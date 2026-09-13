import React from 'react';
import WorkCard from '@/components/WorkCard';

/**
 * Responsive grid of work cards.
 *
 * `editorial` alternates one full-width card followed by two half-width cards
 * (1 + 2 + 1 + 2 …), which gives the index page a magazine-like rhythm.
 * Without it, every card takes half the row.
 */
const WorkGrid = ({ projects = [], editorial = false }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
      {projects.map((project, index) => {
        const wide = editorial && index % 3 === 0;
        return (
          <WorkCard
            key={project.id}
            project={project}
            index={index}
            wide={wide}
            className={wide ? 'sm:col-span-2' : ''}
          />
        );
      })}
    </div>
  );
};

export default WorkGrid;
