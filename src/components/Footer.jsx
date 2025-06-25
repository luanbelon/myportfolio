import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-black border-t border-yellow-400/20 py-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-yellow-400 rounded-full"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 text-gray-300"
          >
            <span>{t('madeWith')}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="text-yellow-400 fill-current" size={16} />
            </motion.div>
            <span>{t('by')}</span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="text-yellow-400 font-semibold cursor-pointer"
            >
              Luan Santos
            </motion.span>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm"
          >
            © 2024 Luan Santos. {t('allRights')}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 text-sm text-gray-400"
          >
            <motion.span
              whileHover={{ color: "#FFD700", scale: 1.05 }}
              className="cursor-pointer transition-colors"
            >
              {t('frontendDeveloper')}
            </motion.span>
            <span>•</span>
            <motion.span
              whileHover={{ color: "#FFD700", scale: 1.05 }}
              className="cursor-pointer transition-colors"
            >
              {t('uxDesigner')}
            </motion.span>
            <span>•</span>
            <motion.span
              whileHover={{ color: "#FFD700", scale: 1.05 }}
              className="cursor-pointer transition-colors"
            >
              {t('systemsAnalyst')}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;