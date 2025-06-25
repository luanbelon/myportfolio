
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  pt: {
  // Header
  home: 'Início',
  skills: 'Habilidades',
  projects: 'Projetos',
  contact: 'Contato',
  testimonials: 'Depoimentos',

  // Hero
  heroTitle: 'Eu sou',
  heroSubtitle: 'Analista de Sistemas & UX Designer',
  heroDescription: 'Especializado em criar experiências digitais incríveis usando React, Angular, WordPress e ferramentas de design. Transformo ideias em interfaces funcionais e visualmente impactantes.',
  viewProjects: 'Ver Meus Projetos',
  getInTouch: 'Entre em Contato',

  // Skills
  skillsTitle: 'Minhas Habilidades',
  frontendDev: 'Desenvolvimento Front-end',
  designUx: 'Design & UX',
  cmsEcommerce: 'CMS & E-commerce',
  softSkills: 'Soft Skills',
  professionalExperience: 'Experiência Profissional',

  // Experiência Profissional (role e description traduzíveis)
  exp1_role: 'Analista de Sistemas Front End',
  exp1_desc: 'Criação de peças gráficas com ferramentas Adobe e manutenção de portais WordPress. Desenvolvimento de layouts com HTML, CSS, JavaScript, Angular e NextJS.',
  exp2_role: 'Desenvolvedor Wordpress Freelancer',
  exp2_desc: 'Criação e manutenção de portais e E-commerces WordPress.',
  exp3_role: 'Desenvolvedor Wordpress Freelancer',
  exp3_desc: 'Criação de websites e lojas virtuais com WordPress, Elementor e WooCommerce.',
  exp4_role: 'Desenvolvedor Wordpress',
  exp4_desc: 'Desenvolvimento de websites e lojas virtuais. Criação de layouts responsivos usando HTML, CSS, JavaScript, Angular e NextJS.',

  // Projects
  projectsTitle: 'Projetos',
  all: 'Todos',
  Sunbeat: 'Sunbeat Energy',
  SunbeatDesc: 'Landing page para uma empresa que vende serviços de energia.',
  Overall: 'Sunbeat Energy',
  overallDesc: 'Página de destino para una empresa que vende servicios energéticos.',
  analyticsDashboard: 'Dashboard Analytics',
  dashboardDesc: 'Painel administrativo com gráficos interativos e relatórios em tempo real.',
  corporateSite: 'Site Corporativo',
  corporateDesc: 'Website institucional responsivo com CMS personalizado.',
  deliveryApp: 'App de Delivery',
  deliveryDesc: 'Aplicação web para delivery de comida com sistema de pedidos.',
  creativePortfolio: 'Portfolio Criativo',
  portfolioDesc: 'Site portfolio para artista com galeria interativa.',
  managementSystem: 'Sistema de Gestão',
  managementDesc: 'Plataforma de gestão empresarial com múltiplos módulos.',
  likedWhat: 'Gostou do que viu? Vamos trabalhar juntos!',

  // Testimonials
  testimonialsTitle: 'Depoimentos',
  testimonial1: 'O excelente trabalho do Luan atendeu às minhas expectativas; adorei como ela o projetou e organizou. Continuarei trabalhando com você para melhorar constantemente o meu site.',
  testimonial2: 'Luan é uma pessoa muito dedicada, paciente e trabalhadora. Gostamos muito de trabalhar com ele e estamos muito satisfeitos com o resultado dos nossos projetos.',
  testimonial3: 'O Luan é o melhor! Ele é um profissional muito talentoso, paciente e dedicado. O resultado final do site que criei para nós é impressionante; ele seguiu todos os requisitos e fez alterações quando solicitado. Nós o contrataremos novamente no futuro.',
  testimonial4: 'Adorei trabalhar com o Luan sem dúvida que vou voltar a contactar!',
  previousTestimonial: 'Depoimento anterior',
  nextTestimonial: 'Próximo depoimento',
  goToTestimonial: 'Ir para depoimento',

  // Contact
  hireMeTitle: 'Contate-me',
  workTogether: 'Vamos trabalhar juntos!',
  contactDescription: 'Estou sempre aberto a novos desafios e oportunidades. Se você tem um projeto em mente ou quer apenas conversar sobre tecnologia, não hesite em entrar em contato!',
  socialNetworks: 'Minhas Redes Sociais',
  sendMessage: 'Envie uma Mensagem',
  name: 'Nome',
  email: 'Email',
  subject: 'Assunto',
  message: 'Mensagem',
  yourName: 'Seu nome',
  yourEmail: 'seu@email.com',
  messageSubject: 'Assunto da mensagem',
  projectMessage: 'Conte-me sobre seu projeto...',
  sendMessageBtn: 'Enviar Mensagem',
  messageSent: 'Mensagem enviada com sucesso!',
  messageError: 'Erro ao enviar mensagem. Tente novamente.',

  // Footer
  madeWith: 'Feito com',
  by: 'por',
  allRights: 'Todos os direitos reservados.',
  frontendDeveloper: 'Desenvolvedor Front-end',
  uxDesigner: 'UX Designer',
  systemsAnalyst: 'Analista de Sistemas',

  // Accessibility
  accessibility: 'Acessibilidade',
  accessibilityControls: 'Controles de Acessibilidade',
  fontSize: 'Tamanho da Fonte',
  increaseFontSize: 'Aumentar fonte',
  decreaseFontSize: 'Diminuir fonte',
  highContrast: 'Alto Contraste',
  toggleHighContrast: 'Alternar alto contraste',
  reset: 'Redefinir',

  // Toast messages
  linkInDevelopment: '🚧 Link em desenvolvimento!',
  linkDescription: 'Este link ainda não foi implementado—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀',
  formInDevelopment: '🚧 Formulário em desenvolvimento!',
  formDescription: 'Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀',
  featureInDevelopment: '🚧 Funcionalidade em desenvolvimento!',
  featureDescription: 'Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀'
},
  en: {
    // Header
    home: 'Home',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    testimonials: 'Testimonials',
    
    // Hero
    heroTitle: 'I am',
    heroSubtitle: 'Systems Analyst & UX Designer',
    heroDescription: 'Specialized in creating incredible digital experiences using React, Angular, WordPress and design tools. I transform ideas into functional and visually impactful interfaces.',
    viewProjects: 'View My Projects',
    getInTouch: 'Get In Touch',
    
    // Skills
    skillsTitle: 'My Skills',
    frontendDev: 'Frontend Development',
    designUx: 'Design & UX',
    cmsEcommerce: 'CMS & E-commerce',
    softSkills: 'Soft Skills',
    professionalExperience: 'Professional Experience',
    
    // Projects
    projectsTitle: 'Projects',
    all: 'All',
    Sunbeat: 'Sunbeat Energy',
    SunbeatDesc: 'Landing page for a company that sells energy services.',
    Overall: 'Sunbeat Energy',
    overallDesc: 'Página de destino para una empresa que vende servicios energéticos.',
    analyticsDashboard: 'Analytics Dashboard',
    dashboardDesc: 'Administrative panel with interactive charts and real-time reports.',
    corporateSite: 'Corporate Website',
    corporateDesc: 'Responsive institutional website with custom CMS.',
    deliveryApp: 'Delivery App',
    deliveryDesc: 'Web application for food delivery with ordering system.',
    creativePortfolio: 'Creative Portfolio',
    portfolioDesc: 'Portfolio website for artist with interactive gallery.',
    managementSystem: 'Management System',
    managementDesc: 'Business management platform with multiple modules.',
    likedWhat: 'Liked what you saw? Let\'s work together!',

    // Experiência Profissional (role e description traduzíveis)
    // Experience Translations
    exp1_role: 'Frontend Systems Analyst',
    exp1_desc: 'Created graphic pieces using Adobe tools and maintained WordPress portals. Developed layouts with HTML, CSS, JavaScript, Angular, and NextJS.',
    exp2_role: 'Freelance WordPress Developer',
    exp2_desc: 'Created and maintained WordPress portals and e-commerce websites.',
    exp3_role: 'Freelance WordPress Developer',
    exp3_desc: 'Built websites and online stores using WordPress, Elementor, and WooCommerce.',
    exp4_role: 'WordPress Developer',
    exp4_desc: 'Developed websites and e-commerce stores. Created responsive layouts using HTML, CSS, JavaScript, Angular, and NextJS.',

    // Testimonials
    testimonialsTitle: 'Testimonials',
    testimonial1: 'Luan is a excellent work met my expectations; I loved how she designed and organized it. I will continue to work with you to constantly improve my site.',
    testimonial2: 'Luan is a very dedicated, patient and hard-working person. We really enjoyed working with him and are very pleased with the results of our projects.',
    testimonial3: 'Luan is the best! He is a very talented, patient and dedicated professional. The end result of the website he created for us is impressive; he followed all the requirements and made changes when requested. We will hire him again in the future.',
    testimonial4: 'I loved working with Luan and I will definitely contact him again!',
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    goToTestimonial: 'Go to testimonial',
    
    // Contact
    hireMeTitle: 'Contact Me',
    workTogether: 'Let\'s work together!',
    contactDescription: 'I\'m always open to new challenges and opportunities. If you have a project in mind or just want to talk about technology, don\'t hesitate to get in touch!',
    socialNetworks: 'My Social Networks',
    sendMessage: 'Send a Message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    yourName: 'Your name',
    yourEmail: 'your@email.com',
    messageSubject: 'Message subject',
    projectMessage: 'Tell me about your project...',
    sendMessageBtn: 'Send Message',
    messageSent: 'Message sent successfully!',
    messageError: 'Error sending message. Please try again.',
    
    // Footer
    madeWith: 'Made with',
    by: 'by',
    allRights: 'All rights reserved.',
    frontendDeveloper: 'Frontend Developer',
    uxDesigner: 'UX Designer',
    systemsAnalyst: 'Systems Analyst',
    
    // Accessibility
    accessibility: 'Accessibility',
    accessibilityControls: 'Accessibility Controls',
    fontSize: 'Font Size',
    increaseFontSize: 'Increase font size',
    decreaseFontSize: 'Decrease font size',
    highContrast: 'High Contrast',
    toggleHighContrast: 'Toggle high contrast',
    reset: 'Reset',
    
    // Toast messages
    linkInDevelopment: '🚧 Link under development!',
    linkDescription: 'This link hasn\'t been implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    formInDevelopment: '🚧 Form under development!',
    formDescription: 'This functionality hasn\'t been implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    featureInDevelopment: '🚧 Feature under development!',
    featureDescription: 'This functionality hasn\'t been implemented yet—but don\'t worry! You can request it in your next prompt! 🚀'
  },
  es: {
    // Header
    home: 'Inicio',
    skills: 'Habilidades',
    projects: 'Proyectos',
    contact: 'Contacto',
    testimonials: 'Testimonios',
    
    // Hero
    heroTitle: 'Soy',
    heroSubtitle: 'Analista de Sistemas y Diseñador UX',
    heroDescription: 'Especializado en crear experiencias digitales increíbles usando React, Angular, WordPress y herramientas de diseño. Transformo ideas en interfaces funcionales y visualmente impactantes.',
    viewProjects: 'Ver Mis Proyectos',
    getInTouch: 'Ponte en Contacto',
    
    // Skills
    skillsTitle: 'Mis Habilidades',
    frontendDev: 'Desarrollo Frontend',
    designUx: 'Diseño y UX',
    cmsEcommerce: 'CMS y E-commerce',
    softSkills: 'Habilidades Blandas',
    professionalExperience: 'Experiencia Profesional',
    
    // Projects
    projectsTitle: 'Proyectos',
    all: 'Todos',
    Sunbeat: 'Sunbeat Energy',
    SunbeatDesc: 'Página de destino para una empresa que vende servicios energéticos.',
    Overall: 'Sunbeat Energy',
    overallDesc: 'Página de destino para una empresa que vende servicios energéticos.',
    analyticsDashboard: 'Dashboard de Analytics',
    dashboardDesc: 'Panel administrativo con gráficos interactivos e informes en tiempo real.',
    corporateSite: 'Sitio Corporativo',
    corporateDesc: 'Sitio web institucional responsivo con CMS personalizado.',
    deliveryApp: 'App de Delivery',
    deliveryDesc: 'Aplicación web para delivery de comida con sistema de pedidos.',
    creativePortfolio: 'Portfolio Creativo',
    portfolioDesc: 'Sitio web portfolio para artista con galería interactiva.',
    managementSystem: 'Sistema de Gestión',
    managementDesc: 'Plataforma de gestión empresarial con múltiples módulos.',
    likedWhat: '¿Te gustó lo que viste? ¡Trabajemos juntos!',

    // Experiência Profissional (role e description traduzíveis)
    // Experience Translations
    exp1_role: 'Analista de Sistemas Frontend',
    exp1_desc: 'Creación de piezas gráficas con herramientas de Adobe y mantenimiento de portales WordPress. Desarrollo de diseños con HTML, CSS, JavaScript, Angular y NextJS.',
    exp2_role: 'Desarrollador WordPress Freelance',
    exp2_desc: 'Creación y mantenimiento de portales WordPress y sitios de comercio electrónico.',
    exp3_role: 'Desarrollador WordPress Freelance',
    exp3_desc: 'Creación de sitios web y tiendas online utilizando WordPress, Elementor y WooCommerce.',
    exp4_role: 'Desarrollador WordPress',
    exp4_desc: 'Desarrollo de sitios web y tiendas virtuales. Creación de diseños responsivos con HTML, CSS, JavaScript, Angular y NextJS.',

    
    // Testimonials
    testimonialsTitle: 'Testimonios',
    testimonial1: 'El excelente trabajo de Luan cumplió con mis expectativas; me encantó cómo lo diseñó y organizó. Seguiré trabajando contigo para mejorar constantemente mi sitio.',
    testimonial2: 'Luan es una persona muy dedicada, paciente y trabajadora. Disfrutamos mucho trabajando con él y estamos muy satisfechos con los resultados de nuestros proyectos.',
    testimonial3: '¡Luan es el mejor! Es un profesional muy talentoso, paciente y dedicado. El resultado final del sitio web que creó para nosotros es impresionante; cumplió con todos los requisitos e hizo los cambios necesarios. Lo contrataremos de nuevo en el futuro.',
    testimonial4: '¡Me encantó trabajar con Luan y definitivamente volveré a contactarlo!',
    previousTestimonial: 'Testimonio anterior',
    nextTestimonial: 'Siguiente testimonio',
    goToTestimonial: 'Ir al testimonio',
    
    // Contact
    hireMeTitle: 'Contáctame',
    workTogether: '¡Trabajemos juntos!',
    contactDescription: 'Siempre estoy abierto a nuevos desafíos y oportunidades. Si tienes un proyecto en mente o solo quieres hablar sobre tecnología, ¡no dudes en contactarme!',
    socialNetworks: 'Mis Redes Sociales',
    sendMessage: 'Envía un Mensaje',
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    yourName: 'Tu nombre',
    yourEmail: 'tu@email.com',
    messageSubject: 'Asunto del mensaje',
    projectMessage: 'Cuéntame sobre tu proyecto...',
    sendMessageBtn: 'Enviar Mensaje',
    messageSent: '¡Mensaje enviado con éxito!',
    messageError: 'Error al enviar mensaje. Inténtalo de nuevo.',
    
    // Footer
    madeWith: 'Hecho con',
    by: 'por',
    allRights: 'Todos los derechos reservados.',
    frontendDeveloper: 'Desarrollador Frontend',
    uxDesigner: 'Diseñador UX',
    systemsAnalyst: 'Analista de Sistemas',
    
    // Accessibility
    accessibility: 'Accesibilidad',
    accessibilityControls: 'Controles de Accesibilidad',
    fontSize: 'Tamaño de Fuente',
    increaseFontSize: 'Aumentar fuente',
    decreaseFontSize: 'Disminuir fuente',
    highContrast: 'Alto Contraste',
    toggleHighContrast: 'Alternar alto contraste',
    reset: 'Restablecer',
    
    // Toast messages
    linkInDevelopment: '🚧 ¡Enlace en desarrollo!',
    linkDescription: 'Este enlace aún no ha sido implementado—¡pero no te preocupes! ¡Puedes solicitarlo en tu próximo prompt! 🚀',
    formInDevelopment: '🚧 ¡Formulario en desarrollo!',
    formDescription: 'Esta funcionalidad aún no ha sido implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀',
    featureInDevelopment: '🚧 ¡Funcionalidad en desarrollo!',
    featureDescription: 'Esta funcionalidad aún no ha sido implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo prompt! 🚀'
  }
};

// Função para detectar idioma baseado no IP (simulada)
const detectLanguageFromIP = async () => {
  try {
    // Simulação de detecção por IP - em produção, você usaria um serviço real
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // Países que falam português
    const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
    // Países que falam espanhol
    const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'];
    
    if (portugueseCountries.includes(data.country_code)) {
      return 'pt';
    } else if (spanishCountries.includes(data.country_code)) {
      return 'es';
    }
    
    return 'en';
  } catch (error) {
    // Fallback para português se não conseguir detectar
    return 'pt';
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      // Primeiro verifica se há idioma salvo no localStorage
      const savedLanguage = localStorage.getItem('portfolio-language');
      
      if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        // Se não há idioma salvo, detecta pelo IP
        const detectedLanguage = await detectLanguageFromIP();
        setLanguage(detectedLanguage);
        localStorage.setItem('portfolio-language', detectedLanguage);
      }
      
      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  const changeLanguage = (newLanguage) => {
    if (['pt', 'en', 'es'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('portfolio-language', newLanguage);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
