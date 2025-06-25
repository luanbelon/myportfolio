import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext'; 
import sunbeat from "../assets/imgs/sunbeatenergy.png"
import overall from "../assets/imgs/overallcontractors.png" 
import caricoos from "../assets/imgs/caricoos.png" 



const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t('Sunbeat'),
      description: t('SunbeatDesc'),   
      image: sunbeat,
      technologies: ['Wordpress', 'JavaScript', 'CSS', 'Elementor'],
      category: 'wordpress',
      github: '#',
      live: 'https://sunbeatenergy.com/en/'
    },
    {
      id: 2,
      title: t('Overall'),
      description: t('overallDesc'),
      image: overall,
      technologies: ['Wordpress', 'Elementor'],
      category: 'wordpress',
      github: '#',
      live: 'https://overallcontractors.com/'
    },
    {
      id: 3,
      title: t('caricoos'),
      description: t('caricoosDesc'),
      image: caricoos,
      technologies: ['HTML', 'CSS'],
      category: 'frontend',
      github: '#',
      live: '#'
    },
    {
      id: 4,
      title: t('deliveryApp'),
      description: t('deliveryDesc'),
      image: 'Food delivery app interface with menu and ordering system',
      technologies: ['NextJS', 'React', 'JavaScript'],
      category: 'ux',
      github: '#',
      live: '#'
    },
    {
      id: 5,
      title: t('creativePortfolio'),
      description: t('portfolioDesc'),
      image: 'Creative portfolio website with interactive gallery',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'frontend',
      github: '#',
      live: '#'
    },
    {
      id: 6,
      title: t('managementSystem'),
      description: t('managementDesc'),
      image: 'Business management system with multiple modules and dashboard',
      technologies: ['Angular', 'TypeScript', 'Sass'],
      category: 'angular',
      github: '#',
      live: '#'
    }
  ];

  const filters = [
    { id: 'todos', label: t('all') },
    { id: 'ux', label: 'UX' },
    { id: 'design', label: 'Desing' },
    { id: 'wordpress', label: 'WordPress' },
    { id: 'frontend', label: 'Frontend' }
  ];

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (type, url) => {
    toast({
      title: t('featureInDevelopment'),
      description: t('featureDescription'),
      duration: 3000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projetos" className="section bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/3 w-32 h-32 border border-yellow-400 rounded-lg rotate-45"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-yellow-500 rounded-lg rotate-12"
        />
      </div>

      <div className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {t('projectsTitle')}
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              variants={filterVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                activeFilter === filter.id
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-transparent text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-black'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: -1 }}
              />
              <Filter size={16} className="inline mr-2" />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card group overflow-hidden relative"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video relative"
                  >
                    <motion.img 
                      initial={{ scale: 1.2, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      src={project.image}
                    />
                  </motion.div>
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                  >
                    {project.github && project.github !== '#' && (
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleProjectClick('github', project.github)}
                        className="p-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
                      >
                        <Github size={20} />
                      </motion.button>
                    )}
                    {project.live && project.live !== '#' && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + techIndex * 0.05 + 0.5,
                          ease: "backOut"
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-xs text-yellow-400 hover:bg-yellow-400/20 transition-all"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 mb-6 text-lg"
          >
            {t('likedWhat')}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="#contato"
            className="btn inline-block"
          >
            {t('getInTouch')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;