import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <Code size={40} />,
      title: t('frontendDev'),
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'NextJS', 'Sass', 'Less'],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: <Palette size={40} />,
      title: t('designUx'),
      skills: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'InDesign', 'Prototipagem'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Globe size={40} />,
      title: t('cmsEcommerce'),
      skills: ['WordPress', 'Elementor', 'WooCommerce', 'Criação de Temas'],
      color: 'from-yellow-600 to-yellow-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const experienceVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="section bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-yellow-400 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-yellow-500 rounded-full"
        />
      </div>

      <div className="container relative z-10">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="section-title"
        >
          {t('skillsTitle')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-2 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="card group relative"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`inline-flex p-4 rounded-full bg-gradient-to-r ${category.color} mb-6 shadow-lg`}
              >
                <div className="text-black">
                  {category.icon}
                </div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors"
              >
                {category.title}
              </motion.h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1 + skillIndex * 0.05 + 0.4,
                      ease: "backOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-sm text-yellow-400 hover:bg-yellow-400/20 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.h3
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-yellow-400"
          >
            {t('professionalExperience')} 
          </motion.h3>

          <div className="space-y-8">
            {[
              
              {
                period: '2022 - Presente',
                company: 'Netra',
                role: t('exp1_role'),
                description: t('exp1_desc')
              },
              {
                period: '2021 - Presente',
                company: 'Mentor Company',
                role: t('exp2_role'),
                description: t('exp2_desc')
              },
              {
                period: '2020 - 2023',
                company: 'Fitarias',
                role: t('exp3_role'),
                description: t('exp3_desc')
              },
              {
                period: '2018 - 2021',
                company: 'Agencia Oito',
                role: t('exp4_role'),
                description: t('exp4_desc')
              }
            ].map((job, index) => (
              <motion.div
                key={index}
                variants={experienceVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="card relative"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-lg"
                />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="md:w-1/4"
                  >
                    <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    className="md:w-3/4"
                  >
                    <h4 className="text-xl font-bold text-white mb-1">{job.role}</h4>
                    <p className="text-yellow-400 mb-2 font-semibold">{job.company}</p>
                    <p className="text-gray-300 leading-relaxed">{job.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;