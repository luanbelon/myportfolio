import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: 'Luis Mariano',
      company: 'Preach Digital',
      role: 'Founder',
      rating: 5,
      testimonial: t('testimonial1')
    },
    {
      id: 2,
      name: 'Mirza Wajahat',
      company: 'Coztrix',
      role: 'CEO',
      rating: 5,
      testimonial: t('testimonial2')
    },
    {
      id: 3,
      name: 'Kingsley',
      company: 'Security51',
      role: 'Product Manager',
      rating: 5,
      testimonial: t('testimonial3')
    },
    {
      id: 4,
      name: 'Maria Eduarda',
      company: 'Mentor Company',
      role: 'Founder',
      rating: 5,
      testimonial: t('testimonial4')
    }
  ];

  const testimonialsPerPage = 2;

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const visibleTestimonials = Array.from({ length: testimonialsPerPage }, (_, i) =>
    testimonials[(currentIndex + i) % testimonials.length]
  );

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + testimonialsPerPage) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - testimonialsPerPage + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="depoimentos" className="section bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          {t('testimonialsTitle')}
        </motion.h2>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleTestimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card relative p-8 bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-lg border border-yellow-500"
              >
                <div className="mt-6 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>

                  <blockquote className="text-lg italic text-gray-300 mb-6">
                    “{item.testimonial}”
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-yellow-400 font-medium">{item.role}</p>
                      <p className="text-gray-400 text-sm">{item.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-400/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-400/20 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * testimonialsPerPage)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / testimonialsPerPage) === i
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-yellow-400/30 hover:bg-yellow-400/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
