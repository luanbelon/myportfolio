
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Plus, Minus, Eye, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, toggleHighContrast, resetAccessibility } = useAccessibility();
  const { t } = useLanguage();

  const controlsVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative"
      >
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
          aria-label={t('accessibilityControls')}
        >
          <Accessibility size={24} />
        </motion.button>

        {/* Controls Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={controlsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-md border border-yellow-400/30 rounded-lg p-4 min-w-[200px]"
            >
              <motion.h3
                variants={itemVariants}
                className="text-yellow-400 font-semibold mb-3 text-sm"
              >
                {t('accessibility')}
              </motion.h3>

              <div className="space-y-3">
                {/* Font Size Controls */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <span className="text-white text-sm">{t('fontSize')}</span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={decreaseFontSize}
                      disabled={fontSize === 'small'}
                      className="w-8 h-8 bg-yellow-400/20 text-yellow-400 rounded border border-yellow-400/30 hover:bg-yellow-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      aria-label={t('decreaseFontSize')}
                    >
                      <Minus size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={increaseFontSize}
                      disabled={fontSize === 'large'}
                      className="w-8 h-8 bg-yellow-400/20 text-yellow-400 rounded border border-yellow-400/30 hover:bg-yellow-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      aria-label={t('increaseFontSize')}
                    >
                      <Plus size={14} />
                    </motion.button>
                  </div>
                </motion.div>

                {/* High Contrast Toggle */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <span className="text-white text-sm">{t('highContrast')}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleHighContrast}
                    className={`w-8 h-8 rounded border border-yellow-400/30 transition-colors flex items-center justify-center ${
                      highContrast 
                        ? 'bg-yellow-400 text-black' 
                        : 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
                    }`}
                    aria-label={t('toggleHighContrast')}
                  >
                    <Eye size={14} />
                  </motion.button>
                </motion.div>

                {/* Reset Button */}
                <motion.div variants={itemVariants} className="pt-2 border-t border-yellow-400/20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAccessibility}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-yellow-400/10 text-yellow-400 rounded border border-yellow-400/30 hover:bg-yellow-400/20 transition-colors text-sm"
                  >
                    <RotateCcw size={14} />
                    {t('reset')}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AccessibilityControls;
