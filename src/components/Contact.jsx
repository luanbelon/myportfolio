
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSocialClick = (platform) => {
    toast({
      title: t('linkInDevelopment'),
      description: t('linkDescription'),
      duration: 3000,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // Simular envio de email para luanbelondev.com
      const response = await fetch('https://formspree.io/f/xpwagdqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _replyto: data.email,
          _subject: `Portfolio Contact: ${data.subject}`,
          _to: 'luan@luanbelondev.com'
        })
      });

      if (response.ok) {
        toast({
          title: t('messageSent'),
          description: 'Obrigado pelo contato! Responderei em breve.',
          duration: 5000,
        });
        e.target.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast({
        title: t('messageError'),
        description: 'Por favor, tente novamente ou entre em contato diretamente.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/luansantos-dev/'
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      color: 'hover:text-gray-400',
      platform: 'github',
      url: 'https://github.com/luanbelon'
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      color: 'hover:text-red-400',
      platform: 'email',
      url: 'mailto:luan@luanbelondev.com'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <section id="contato" className="section bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-40 h-40 border border-yellow-400 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-32 h-32 border border-yellow-500 rounded-full"
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
          {t('hireMeTitle')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
            >
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-4"
              >
                {t('workTogether')}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {t('contactDescription')}
              </motion.p>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >
              {[
                { icon: Mail, text: 'luan@luanbelondev.com' },
                { icon: Phone, text: '+55 (71) 98640-6627' },
                { icon: MapPin, text: 'Salvador - Bahia, Brasil' }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 text-gray-300 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-yellow-400/10 rounded-full"
                  >
                    <contact.icon className="text-yellow-400" size={20} />
                  </motion.div>
                  <span>{contact.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
            >
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-white mb-4"
              >
                {t('socialNetworks')}
              </motion.h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={socialVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-yellow-400/10 rounded-full text-yellow-400 transition-colors ${social.color} relative overflow-hidden`}
                    title={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-yellow-400/20 rounded-full"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="card"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-6"
            >
              {t('sendMessage')}
            </motion.h3>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    {t('name')}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#FFD700" }}
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-all"
                    placeholder={t('yourName')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">
                    {t('email')}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#FFD700" }}
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-all"
                    placeholder={t('yourEmail')}
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  {t('subject')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: "#FFD700" }}
                  type="text"
                  name="subject"
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-all"
                  placeholder={t('messageSubject')}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-300 mb-2 font-medium">
                  {t('message')}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02, borderColor: "#FFD700" }}
                  rows="5"
                  name="message"
                  className="w-full px-4 py-3 bg-black/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-all resize-none"
                  placeholder={t('projectMessage')}
                  required
                ></motion.textarea>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : t('sendMessageBtn')}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
