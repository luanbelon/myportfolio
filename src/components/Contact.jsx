import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/components/Reveal';
import { FREELANCER_URL, GITHUB_URL, LINKEDIN_URL } from '@/lib/links';

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('https://formspree.io/f/xpwagdqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          _replyto: data.email,
          _subject: `Portfolio Contact: ${data.subject}`,
          _to: 'luanbelon@gmail.com',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      toast({ title: t('messageSent'), duration: 5000 });
      event.target.reset();
    } catch (error) {
      toast({ title: t('messageError'), duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="section">
      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="section-title">{t('workTogether')}</h2>
          <a
            href="mailto:luanbelon@gmail.com"
            className="mt-10 block font-display text-[clamp(1.6rem,4vw,3rem)] tracking-tight leading-[1.1] hover:opacity-70 transition-opacity"
          >
            luanbelon@gmail.com
          </a>
          <p className="mt-6 text-muted max-w-md">{t('contactDescription')}</p>
          <p className="mt-4 text-sm text-zinc-400">
            {t('heroLocation')}
            <br />
            {t('availability')}
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-zinc-400">
            <a href={FREELANCER_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              {t('hireMe')}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 space-y-6 lg:pt-4" delay={0.08}>
          <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="label">{t('name')}</span>
              <input name="name" className="field" required />
            </label>
            <label className="block">
              <span className="label">{t('email')}</span>
              <input type="email" name="email" className="field" required />
            </label>
          </div>
          <label className="block">
            <span className="label">{t('subject')}</span>
            <input name="subject" className="field" required />
          </label>
          <label className="block">
            <span className="label">{t('message')}</span>
            <textarea name="message" rows="4" className="field resize-none" required />
          </label>
          <button type="submit" disabled={isSubmitting} className="btn mt-2">
            {isSubmitting ? t('sending') : t('sendMessageBtn')}
          </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
