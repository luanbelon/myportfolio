import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Github, GraduationCap, Briefcase, Sparkles } from 'lucide-react';

const ResumePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-16">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-2">Curriculo</p>
            <h1 className="text-4xl md:text-5xl font-bold">Luan Santos</h1>
            <p className="text-gray-300 mt-2">
              Desenvolvedor Web e UX Designer focado em projetos remotos, performance e experiencia do usuario.
            </p>
          </div>
          <Link className="btn btn-outline" to="/">
            Voltar ao portfolio
          </Link>
        </div>

        <section className="card mb-6 !p-6">
          <div className="grid md:grid-cols-2 gap-4 text-gray-200">
            <a href="mailto:luanssantosti@gmail.com" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
              <Mail size={18} className="text-yellow-400" />
              <span>luanssantosti@gmail.com</span>
            </a>
            <a href="tel:+5571986406627" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
              <Phone size={18} className="text-yellow-400" />
              <span>+55 71 98640-6627</span>
            </a>
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-yellow-400" />
              <span>Itapua, Salvador - Bahia, Brasil</span>
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/luansantos-dev/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Linkedin size={18} className="text-yellow-400" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/luanbelon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                <Github size={18} className="text-yellow-400" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>

        <section className="card mb-6 !p-6">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
            <Sparkles size={20} />
            Resumo profissional
          </h2>
          <p>
            Sou um desenvolvedor web e designer de UX, ativamente buscando oportunidades freelance e de meio periodo
            em ambientes de trabalho remoto. Tenho experiencia pratica em desenvolvimento de sites com foco em
            resultado, comunicacao com clientes e melhoria continua da experiencia do usuario.
          </p>
        </section>

        <section className="card mb-6 !p-6">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Habilidades</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-black/30 border border-yellow-400/10 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">Soft skills</p>
              <p>Leadership, Communication, Team work</p>
            </div>
            <div className="bg-black/30 border border-yellow-400/10 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">Desenvolvimento</p>
              <p>HTML, CSS, JavaScript, NextJS, WordPress, Elementor, WooCommerce, Angular, React Native, Flutter</p>
            </div>
            <div className="bg-black/30 border border-yellow-400/10 rounded-lg p-4">
              <p className="font-semibold text-yellow-400 mb-2">Design</p>
              <p>Illustrator, Photoshop, Indesign, Figma, Adobe XD, Canva</p>
            </div>
          </div>
        </section>

        <section className="card mb-6 !p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <Briefcase size={20} />
            Experiencia
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Avansys, Brasil — Analista de Sistemas</h3>
              <p className="text-gray-300">Desde junho de 2022</p>
              <ul className="list-disc ml-5 text-gray-200">
                <li>Criacao de pecas graficas com ferramentas Adobe (Illustrator, Photoshop e Indesign).</li>
                <li>Manutencao de portal WordPress de cliente.</li>
                <li>Desenvolvimento de layouts com HTML, CSS e JavaScript.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Fitarias, Brasil/Portugal — Desenvolvedor WordPress Freelancer</h3>
              <p className="text-gray-300">2020 - 2022</p>
              <ul className="list-disc ml-5 text-gray-200">
                <li>Criacao de sites e lojas virtuais com WordPress, Elementor e WooCommerce.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Agencia Oito, Brasil — CEO</h3>
              <p className="text-gray-300">2018 - 2023</p>
              <ul className="list-disc ml-5 text-gray-200">
                <li>Fundacao e lideranca da agencia focada em vendas de sites WordPress.</li>
                <li>Atuacao por 5 anos em criacao de sites e melhoria de UX em portais de clientes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card !p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <GraduationCap size={20} />
            Formacao academica
          </h2>
          <ul className="space-y-3 text-gray-200">
            <li><span className="text-yellow-400 font-medium">Unifacs</span> — Graduacao Tecnologica em Sistemas para Internet (jun/2015 a ago/2018)</li>
            <li><span className="text-yellow-400 font-medium">UAM</span> — MBA em User Experience (fev/2021 a jun/2022)</li>
            <li><span className="text-yellow-400 font-medium">Cubos Academy</span> — UX/UI Design (fev/2022 a jun/2022)</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
