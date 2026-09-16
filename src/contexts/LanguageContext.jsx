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
    home: 'Início',
    work: 'Trabalho',
    articles: 'Artigos',
    resume: 'Currículo',
    downloadResume: 'Baixar PDF',
    resumeFileName: 'Luan-Belon-Curriculo',
    contact: 'Contato',
    skills: 'Sobre',
    testimonials: 'Depoimentos',

    heroTitle: 'Luan Belon',
    heroSubtitle: 'Engenheiro Frontend Pleno e UX/UI Designer',
    heroDescription: 'Transformo requisitos de negócio e design em interfaces rápidas, acessíveis e que convertem: sites, e-commerces e produtos digitais.',
    heroManifesto: 'Ajudo marcas a se destacarem na era digital.',
    heroLocation: 'Salvador, Brasil',
    availability: 'Atua a partir do Brasil · disponível para remoto e freelance',
    heroDiscipline: 'Frontend · UX',
    heroRoles: ['Designer UX/UI', 'Engenheiro Frontend', 'Desenvolvedor WordPress'],
    viewWork: 'Ver trabalho',
    viewProjects: 'Ver trabalho',
    hireMe: 'Contratar',
    getInTouch: 'Contato',
    siteTitle: 'Luan Belon — Engenheiro Frontend Pleno e UX/UI Designer',
    siteDescription: 'Luan Belon — engenheiro frontend pleno e UX/UI. Atua a partir do Brasil, disponível para remoto e freelance. Sites, e-commerce e produto digital do Figma ao código. 47 avaliações 5.0 no Freelancer.',
    menu: 'Menu',
    skipToContent: 'Ir para o conteúdo',
    languageLabel: 'Idioma',
    resumeMetaDescription: 'Currículo de Luan Belon — engenheiro frontend pleno e UX/UI. Atua a partir do Brasil, disponível para remoto e freelance. Experiência em Angular, React, WordPress e Figma.',
    geoFactsTitle: 'Informações profissionais',
    geoFactRole: 'Cargo',
    geoFactLocation: 'Local',
    geoFactAvailability: 'Disponibilidade',
    geoFactServices: 'Serviços',
    geoFactExperience: 'Experiência',
    geoFactExperienceValue: '8+ anos · 47 avaliações 5.0 no Freelancer',
    geoFactServicesValue: 'Sites, e-commerce, UX/UI, WordPress, Angular e React',
    education: 'Formação',
    eduMba: 'MBA em UX',
    eduDegree: 'Sistemas para Internet',
    eduCubos: 'Design UX/UI',
    eduUdacity: 'Nanodegree de Marketing Digital',
    research: 'Pesquisa',
    roleFounder: 'Fundador',
    roleCeo: 'CEO',
    rolePm: 'Gerente de produto',
    roleClient: 'Cliente',

    aboutTitle: 'Sobre',
    geoIntro: 'Luan Belon é engenheiro frontend pleno e designer UX/UI, especializado em Angular, WordPress e interfaces web acessíveis.',
    geoIntroExtended: 'Seu trabalho inclui sites institucionais, aplicações web, e-commerce, design de interface e produtos digitais para clientes no Brasil e no exterior.',
    expertiseTitle: 'Expertise',
    expertiseLead: 'Áreas em que Luan Belon atua como engenheiro frontend e designer UX/UI.',
    expSkill1Title: 'Engenharia frontend',
    expSkill1Desc: 'Desenvolvimento de interfaces com Angular, React, TypeScript e JavaScript, com foco em componentes reutilizáveis, performance e manutenção.',
    expSkill2Title: 'Angular',
    expSkill2Desc: 'Construção de aplicações escaláveis, integração com APIs e interfaces orientadas a requisitos de negócio.',
    expSkill3Title: 'WordPress e e-commerce',
    expSkill3Desc: 'Sites e lojas com WordPress, WooCommerce e Elementor, do layout ao código publicado.',
    expSkill4Title: 'UX/UI Design',
    expSkill4Desc: 'Pesquisa, wireframes, protótipos e design systems em Figma para produtos digitais claros e usáveis.',
    expSkill5Title: 'Acessibilidade e SEO técnico',
    expSkill5Desc: 'Interfaces acessíveis, HTML semântico, performance, dados estruturados e descoberta em busca tradicional e generativa.',
    aboutLead: 'Engenheiro frontend pleno, com MBA em UX e oito anos de web. Transformo design e requisitos de negócio em sites, lojas e produtos digitais do Figma ao código, com performance, acessibilidade e prazo. Atuo a partir do Brasil, disponível para remoto e freelance.',
    skillsTitle: 'Capacidades',
    frontendDev: 'Frontend',
    designUx: 'UX e interface',
    cmsEcommerce: 'CMS e e-commerce',
    professionalExperience: 'Percurso',
    present: 'atual',
    proofYears: 'anos de carreira',
    proofReviews: 'avaliações no Freelancer',
    proofRating: 'nota média',
    proofOnTime: 'entregas no prazo',
    proofMba: 'em UX',
    exp1_role: 'Engenheiro Frontend Pleno',
    exp1_desc: 'Na Netra, transformo requisitos de negócio e design em interfaces com Angular, TypeScript, JavaScript e WordPress. Foco em performance, acessibilidade e código que o time consegue manter.',
    exp2_role: 'Desenvolvedor front-end e UX (Freelance)',
    exp2_desc: 'Desde 2017 no Freelancer.com: 47 avaliações 5.0. Sites e e-commerces para clientes nos EUA, México e Brasil. Figma para WordPress, WooCommerce, Elementor, SEO e otimização.',
    exp3_role: 'Desenvolvedor WordPress',
    exp3_desc: 'Criação de websites e e-commerces com WordPress, Elementor e WooCommerce.',
    exp4_role: 'Desenvolvedor WordPress',
    exp4_desc: 'Sites e layouts responsivos para clientes da agência, do visual ao HTML, CSS e JavaScript.',

    selectedWork: 'Trabalho selecionado',
    selectedWorkLead: 'Uma amostra de sites, cases e protótipos. O restante está no índice.',
    viewAllWork: 'Ver todo o trabalho',
    workTitle: 'Trabalho',
    workLead: 'Sites, e-commerces e produtos digitais — do Figma ao código.',
    all: 'Todos',
    emptyWork: 'Nenhum trabalho neste filtro por enquanto.',
    backToWork: 'Voltar ao trabalho',
    liveSite: 'Ver site',
    openFigma: 'Abrir no Figma',
    readOnMedium: 'Ler no Medium',
    beforeLabel: 'Antes',
    afterLabel: 'Depois',
    yearLabel: 'Ano',
    clientLabel: 'Cliente',
    roleLabel: 'Papel',
    galleryLabel: 'Galeria',
    prototypeLabel: 'Protótipo',

    typeWebsite: 'Site',
    typeBeforeAfter: 'Antes e depois',
    typeLayout: 'Layout',
    typeCaseStudy: 'Case UX/UI',
    typePrototype: 'Protótipo',
    typeArticle: 'Artigo',

    articlesTitle: 'Escrita',
    articlesLead: 'Notas e artigos publicados no Medium sobre produto, interface e frontend.',
    recentWriting: 'Escrita recente',
    emptyArticles: 'Nenhum artigo publicado ainda.',

    testimonialsTitle: 'Depoimentos',
    testimonial1: 'O excelente trabalho do Luan atendeu às minhas expectativas; adorei como ele projetou e organizou. Continuarei trabalhando com você para melhorar constantemente o meu site.',
    testimonial2: 'Luan é uma pessoa muito dedicada, paciente e trabalhadora. Gostamos muito de trabalhar com ele e estamos muito satisfeitos com o resultado dos nossos projetos.',
    testimonial3: 'O Luan é o melhor! Ele é um profissional muito talentoso, paciente e dedicado. O resultado final do site que criou para nós é impressionante; ele seguiu todos os requisitos e fez alterações quando solicitado. Nós o contrataremos novamente no futuro.',
    testimonial4: 'Adorei trabalhar com o Luan; sem dúvida vou voltar a contactar.',
    testimonial5: 'Profissional excelente. Entregou o site igual ao layout do Figma, na metade do prazo, e fez todas as alterações que pedimos.',
    previousTestimonial: 'Depoimento anterior',
    nextTestimonial: 'Próximo depoimento',
    goToTestimonial: 'Ir para depoimento',

    hireMeTitle: 'Contato',
    workTogether: 'Vamos construir o próximo projeto.',
    contactDescription: 'Atua a partir do Brasil, disponível para remoto e freelance. Sites, e-commerce e produto digital — Figma para WordPress ou frontend em Angular e React.',
    socialNetworks: 'Redes',
    sendMessage: 'Mensagem',
    name: 'Nome',
    email: 'Email',
    subject: 'Assunto',
    message: 'Mensagem',
    yourName: 'Seu nome',
    yourEmail: 'seu@email.com',
    messageSubject: 'Assunto',
    projectMessage: 'Conte sobre o projeto…',
    sendMessageBtn: 'Enviar',
    sending: 'Enviando…',
    messageSent: 'Mensagem enviada.',
    messageError: 'Não foi possível enviar. Tente novamente.',

    madeWith: 'Luan Belon',
    by: '—',
    allRights: 'Todos os direitos reservados.',
    frontendDeveloper: 'Frontend',
    uxDesigner: 'UX Designer',
    systemsAnalyst: 'Analista de Sistemas',

    accessibility: 'Acessibilidade',
    accessibilityControls: 'Controles de acessibilidade',
    fontSize: 'Tamanho da fonte',
    increaseFontSize: 'Aumentar fonte',
    decreaseFontSize: 'Diminuir fonte',
    highContrast: 'Alto contraste',
    toggleHighContrast: 'Alternar alto contraste',
    reset: 'Redefinir',

    linkInDevelopment: 'Link em desenvolvimento',
    linkDescription: 'Este destino ainda não está disponível.',
    formInDevelopment: 'Formulário em desenvolvimento',
    formDescription: 'Esta funcionalidade ainda não foi implementada.',
    featureInDevelopment: 'Funcionalidade em desenvolvimento',
    featureDescription: 'Esta funcionalidade ainda não foi implementada.',
  },
  en: {
    home: 'Home',
    work: 'Work',
    articles: 'Writing',
    resume: 'Resume',
    downloadResume: 'Download PDF',
    resumeFileName: 'Luan-Belon-Resume',
    contact: 'Contact',
    skills: 'About',
    testimonials: 'Testimonials',

    heroTitle: 'Luan Belon',
    heroSubtitle: 'Mid-level Frontend Engineer and UX/UI Designer',
    heroDescription: 'I turn business requirements and design into fast, accessible interfaces that convert: websites, stores and digital products.',
    heroManifesto: 'Helping brands stand out in the digital era.',
    heroLocation: 'Salvador, Brazil',
    availability: 'Working from Brazil · available for remote work and freelance',
    heroDiscipline: 'Frontend · UX',
    heroRoles: ['UX/UI Designer', 'Frontend Engineer', 'WordPress Developer'],
    viewWork: 'View work',
    viewProjects: 'View work',
    hireMe: 'Hire me',
    getInTouch: 'Contact',
    siteTitle: 'Luan Belon — Frontend Engineer and UX/UI Designer',
    siteDescription: 'Luan Belon — frontend engineer and UX/UI designer. Working from Brazil, available for remote work and freelance. Websites, e-commerce and digital products from Figma to code. 47 Freelancer reviews at 5.0.',
    menu: 'Menu',
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
    resumeMetaDescription: 'Resume of Luan Belon — mid-level frontend engineer and UX/UI designer. Working from Brazil, available for remote work and freelance. Angular, React, WordPress and Figma.',
    geoFactsTitle: 'Professional facts',
    geoFactRole: 'Role',
    geoFactLocation: 'Location',
    geoFactAvailability: 'Availability',
    geoFactServices: 'Services',
    geoFactExperience: 'Experience',
    geoFactExperienceValue: '8+ years · 47 Freelancer reviews at 5.0',
    geoFactServicesValue: 'Websites, e-commerce, UX/UI, WordPress, Angular and React',
    education: 'Education',
    eduMba: 'MBA in UX',
    eduDegree: 'Internet Systems',
    eduCubos: 'UX/UI Design',
    eduUdacity: 'Digital Marketing Nanodegree',
    research: 'Research',
    roleFounder: 'Founder',
    roleCeo: 'CEO',
    rolePm: 'Product Manager',
    roleClient: 'Client',

    aboutTitle: 'About',
    geoIntro: 'Luan Belon is a Frontend Engineer and UX/UI Designer specializing in Angular, WordPress and accessible web interfaces.',
    geoIntroExtended: 'His work includes institutional websites, web applications, e-commerce, interface design and digital products for clients in Brazil and abroad.',
    expertiseTitle: 'Expertise',
    expertiseLead: 'Areas where Luan Belon works as a frontend engineer and UX/UI designer.',
    expSkill1Title: 'Frontend engineering',
    expSkill1Desc: 'Interface development with Angular, React, TypeScript and JavaScript, focused on reusable components, performance and maintainability.',
    expSkill2Title: 'Angular',
    expSkill2Desc: 'Building scalable applications, API-driven interfaces and business-oriented frontend solutions.',
    expSkill3Title: 'WordPress and e-commerce',
    expSkill3Desc: 'Websites and stores with WordPress, WooCommerce and Elementor, from layout to production code.',
    expSkill4Title: 'UX/UI design',
    expSkill4Desc: 'Research, wireframes, prototypes and design systems in Figma for clear, usable digital products.',
    expSkill5Title: 'Accessibility and technical SEO',
    expSkill5Desc: 'Accessible interfaces, semantic HTML, performance, structured data and discoverability for search and generative engines.',
    aboutLead: 'Mid-level frontend engineer with an MBA in UX and eight years on the web. I turn design and business requirements into sites, stores and products — from Figma to code, with performance, accessibility and on-time delivery. Working from Brazil, available for remote work and freelance.',
    skillsTitle: 'Capabilities',
    frontendDev: 'Frontend',
    designUx: 'UX and interface',
    cmsEcommerce: 'CMS and e-commerce',
    professionalExperience: 'Path',
    present: 'Present',
    proofYears: 'years in the field',
    proofReviews: 'Freelancer reviews',
    proofRating: 'average rating',
    proofOnTime: 'on-time delivery',
    proofMba: 'in UX',
    exp1_role: 'Frontend Engineer',
    exp1_desc: 'At Netra I turn business requirements and design into interfaces with Angular, TypeScript, JavaScript and WordPress. Focus on performance, accessibility and code the team can maintain.',
    exp2_role: 'Front-end developer & UX design (Freelance)',
    exp2_desc: 'On Freelancer.com since 2017: 47 reviews at 5.0. Websites and stores for clients in the US, Mexico and Brazil. Figma to WordPress, WooCommerce, Elementor, SEO and optimization.',
    exp3_role: 'WordPress developer',
    exp3_desc: 'Websites and stores with WordPress, Elementor and WooCommerce.',
    exp4_role: 'WordPress developer',
    exp4_desc: 'Responsive sites and layouts for agency clients, from visual design to HTML, CSS and JavaScript.',

    selectedWork: 'Selected work',
    selectedWorkLead: 'A sample of sites, case studies and prototypes. The rest lives in the index.',
    viewAllWork: 'View all work',
    workTitle: 'Work',
    workLead: 'Websites, stores and digital products — from Figma to code.',
    all: 'All',
    emptyWork: 'No work in this filter yet.',
    backToWork: 'Back to work',
    liveSite: 'View site',
    openFigma: 'Open in Figma',
    readOnMedium: 'Read on Medium',
    beforeLabel: 'Before',
    afterLabel: 'After',
    yearLabel: 'Year',
    clientLabel: 'Client',
    roleLabel: 'Role',
    galleryLabel: 'Gallery',
    prototypeLabel: 'Prototype',

    typeWebsite: 'Website',
    typeBeforeAfter: 'Before & after',
    typeLayout: 'Layout',
    typeCaseStudy: 'UX/UI case',
    typePrototype: 'Prototype',
    typeArticle: 'Article',

    articlesTitle: 'Writing',
    articlesLead: 'Notes and articles on Medium about product, interface and frontend.',
    recentWriting: 'Recent writing',
    emptyArticles: 'No articles published yet.',

    testimonialsTitle: 'Testimonials',
    testimonial1: 'Luan’s work met my expectations; I loved how he designed and organized it. I will continue to work with you to improve my site.',
    testimonial2: 'Luan is dedicated, patient and hard-working. We enjoyed working with him and are pleased with the results.',
    testimonial3: 'Luan is the best. A talented, patient and dedicated professional. The website he created for us is impressive; he followed the brief and made changes when asked. We will hire him again.',
    testimonial4: 'I loved working with Luan and I will definitely get in touch again.',
    testimonial5: 'An excellent professional. He delivered a website that matched the Figma layout, in half the agreed time, and made every change we asked for.',
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    goToTestimonial: 'Go to testimonial',

    hireMeTitle: 'Contact',
    workTogether: 'Let’s build the next project.',
    contactDescription: 'Working from Brazil, available for remote work and freelance. Websites, e-commerce and digital products — Figma to WordPress, or frontend in Angular and React.',
    socialNetworks: 'Networks',
    sendMessage: 'Message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    yourName: 'Your name',
    yourEmail: 'you@email.com',
    messageSubject: 'Subject',
    projectMessage: 'Tell me about the project…',
    sendMessageBtn: 'Send',
    sending: 'Sending…',
    messageSent: 'Message sent.',
    messageError: 'Could not send. Please try again.',

    madeWith: 'Luan Belon',
    by: '—',
    allRights: 'All rights reserved.',
    frontendDeveloper: 'Frontend',
    uxDesigner: 'UX Designer',
    systemsAnalyst: 'Systems Analyst',

    accessibility: 'Accessibility',
    accessibilityControls: 'Accessibility controls',
    fontSize: 'Font size',
    increaseFontSize: 'Increase font size',
    decreaseFontSize: 'Decrease font size',
    highContrast: 'High contrast',
    toggleHighContrast: 'Toggle high contrast',
    reset: 'Reset',

    linkInDevelopment: 'Link under development',
    linkDescription: 'This destination is not available yet.',
    formInDevelopment: 'Form under development',
    formDescription: 'This feature has not been implemented yet.',
    featureInDevelopment: 'Feature under development',
    featureDescription: 'This feature has not been implemented yet.',
  },
  es: {
    home: 'Inicio',
    work: 'Trabajo',
    articles: 'Artículos',
    resume: 'Currículum',
    downloadResume: 'Descargar PDF',
    resumeFileName: 'Luan-Belon-Curriculum',
    contact: 'Contacto',
    skills: 'Sobre',
    testimonials: 'Testimonios',

    heroTitle: 'Luan Belon',
    heroSubtitle: 'Ingeniero Frontend Pleno y Diseñador UX/UI',
    heroDescription: 'Transformo requisitos de negocio y diseño en interfaces rápidas, accesibles y que convierten: sitios, tiendas y productos digitales.',
    heroManifesto: 'Ayudo a las marcas a destacar en la era digital.',
    heroLocation: 'Salvador, Brasil',
    availability: 'Trabaja desde Brasil · disponible para remoto y freelance',
    heroDiscipline: 'Frontend · UX',
    heroRoles: ['Diseñador UX/UI', 'Ingeniero Frontend', 'Desarrollador WordPress'],
    viewWork: 'Ver trabajo',
    viewProjects: 'Ver trabajo',
    hireMe: 'Contratar',
    getInTouch: 'Contacto',
    siteTitle: 'Luan Belon — Ingeniero Frontend Pleno y Diseñador UX/UI',
    siteDescription: 'Luan Belon — ingeniero frontend pleno y UX/UI. Trabaja desde Brasil, disponible para remoto y freelance. Sitios, e-commerce y producto digital del Figma al código. 47 reseñas 5.0 en Freelancer.',
    menu: 'Menú',
    skipToContent: 'Ir al contenido',
    languageLabel: 'Idioma',
    resumeMetaDescription: 'Currículo de Luan Belon — ingeniero frontend pleno y UX/UI. Trabaja desde Brasil, disponible para remoto y freelance. Angular, React, WordPress y Figma.',
    geoFactsTitle: 'Información profesional',
    geoFactRole: 'Cargo',
    geoFactLocation: 'Ubicación',
    geoFactAvailability: 'Disponibilidad',
    geoFactServices: 'Servicios',
    geoFactExperience: 'Experiencia',
    geoFactExperienceValue: '8+ años · 47 reseñas 5.0 en Freelancer',
    geoFactServicesValue: 'Sitios, e-commerce, UX/UI, WordPress, Angular y React',
    education: 'Formación',
    eduMba: 'MBA en UX',
    eduDegree: 'Sistemas para Internet',
    eduCubos: 'Diseño UX/UI',
    eduUdacity: 'Nanodegree de Marketing Digital',
    research: 'Investigación',
    roleFounder: 'Fundador',
    roleCeo: 'CEO',
    rolePm: 'Gerente de producto',
    roleClient: 'Cliente',

    aboutTitle: 'Sobre',
    geoIntro: 'Luan Belon es ingeniero frontend pleno y diseñador UX/UI, especializado en Angular, WordPress e interfaces web accesibles.',
    geoIntroExtended: 'Su trabajo incluye sitios institucionales, aplicaciones web, e-commerce, diseño de interfaz y productos digitales para clientes en Brasil y en el exterior.',
    expertiseTitle: 'Expertise',
    expertiseLead: 'Áreas en las que Luan Belon actúa como ingeniero frontend y diseñador UX/UI.',
    expSkill1Title: 'Ingeniería frontend',
    expSkill1Desc: 'Desarrollo de interfaces con Angular, React, TypeScript y JavaScript, con foco en componentes reutilizables, rendimiento y mantenimiento.',
    expSkill2Title: 'Angular',
    expSkill2Desc: 'Construcción de aplicaciones escalables, integración con APIs e interfaces orientadas al negocio.',
    expSkill3Title: 'WordPress y e-commerce',
    expSkill3Desc: 'Sitios y tiendas con WordPress, WooCommerce y Elementor, del layout al código en producción.',
    expSkill4Title: 'Diseño UX/UI',
    expSkill4Desc: 'Investigación, wireframes, prototipos y design systems en Figma para productos digitales claros y usables.',
    expSkill5Title: 'Accesibilidad y SEO técnico',
    expSkill5Desc: 'Interfaces accesibles, HTML semántico, rendimiento, datos estructurados y descubrimiento en búsqueda tradicional y generativa.',
    aboutLead: 'Ingeniero frontend pleno, con MBA en UX y ocho años en la web. Transformo diseño y requisitos de negocio en sitios, tiendas y productos — del Figma al código, con rendimiento, accesibilidad y plazo. Trabajo desde Brasil, disponible para remoto y freelance.',
    skillsTitle: 'Capacidades',
    frontendDev: 'Frontend',
    designUx: 'UX e interfaz',
    cmsEcommerce: 'CMS y e-commerce',
    professionalExperience: 'Trayectoria',
    present: 'actual',
    proofYears: 'años de carrera',
    proofReviews: 'reseñas en Freelancer',
    proofRating: 'nota media',
    proofOnTime: 'entregas a tiempo',
    proofMba: 'en UX',
    exp1_role: 'Ingeniero Frontend Pleno',
    exp1_desc: 'En Netra transformo requisitos de negocio y diseño en interfaces con Angular, TypeScript, JavaScript y WordPress. Foco en rendimiento, accesibilidad y código que el equipo puede mantener.',
    exp2_role: 'Desarrollador front-end y UX (Freelance)',
    exp2_desc: 'En Freelancer.com desde 2017: 47 reseñas 5.0. Sitios y e-commerces para clientes en EE. UU., México y Brasil. Figma a WordPress, WooCommerce, Elementor, SEO y optimización.',
    exp3_role: 'Desarrollador WordPress',
    exp3_desc: 'Sitios y tiendas con WordPress, Elementor y WooCommerce.',
    exp4_role: 'Desarrollador WordPress',
    exp4_desc: 'Sitios y layouts responsivos para clientes de la agencia, del visual al HTML, CSS y JavaScript.',

    selectedWork: 'Trabajo seleccionado',
    selectedWorkLead: 'Una muestra de sitios, cases y prototipos. El resto está en el índice.',
    viewAllWork: 'Ver todo el trabajo',
    workTitle: 'Trabajo',
    workLead: 'Sitios, e-commerces y productos digitales — del Figma al código.',
    all: 'Todos',
    emptyWork: 'Todavía no hay trabajo en este filtro.',
    backToWork: 'Volver al trabajo',
    liveSite: 'Ver sitio',
    openFigma: 'Abrir en Figma',
    readOnMedium: 'Leer en Medium',
    beforeLabel: 'Antes',
    afterLabel: 'Después',
    yearLabel: 'Año',
    clientLabel: 'Cliente',
    roleLabel: 'Rol',
    galleryLabel: 'Galería',
    prototypeLabel: 'Prototipo',

    typeWebsite: 'Sitio',
    typeBeforeAfter: 'Antes y después',
    typeLayout: 'Layout',
    typeCaseStudy: 'Case UX/UI',
    typePrototype: 'Prototipo',
    typeArticle: 'Artículo',

    articlesTitle: 'Escritura',
    articlesLead: 'Notas y artículos en Medium sobre producto, interfaz y frontend.',
    recentWriting: 'Escritura reciente',
    emptyArticles: 'Aún no hay artículos publicados.',

    testimonialsTitle: 'Testimonios',
    testimonial1: 'El excelente trabajo de Luan cumplió con mis expectativas; me encantó cómo lo diseñó y organizó. Seguiré trabajando contigo para mejorar constantemente mi sitio.',
    testimonial2: 'Luan es una persona muy dedicada, paciente y trabajadora. Disfrutamos mucho trabajando con él y estamos muy satisfechos con los resultados.',
    testimonial3: 'Luan es el mejor. Un profesional talentoso, paciente y dedicado. El sitio que creó para nosotros es impresionante; cumplió el brief e hizo los cambios necesarios. Lo contrataremos de nuevo.',
    testimonial4: 'Me encantó trabajar con Luan y definitivamente volveré a contactarlo.',
    testimonial5: 'Un profesional excelente. Entregó el sitio igual al layout de Figma, en la mitad del plazo, e hizo todos los cambios que pedimos.',
    previousTestimonial: 'Testimonio anterior',
    nextTestimonial: 'Siguiente testimonio',
    goToTestimonial: 'Ir al testimonio',

    hireMeTitle: 'Contacto',
    workTogether: 'Construyamos el próximo proyecto.',
    contactDescription: 'Trabaja desde Brasil, disponible para remoto y freelance. Sitios, e-commerce y producto digital — Figma a WordPress, o frontend en Angular y React.',
    socialNetworks: 'Redes',
    sendMessage: 'Mensaje',
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    yourName: 'Tu nombre',
    yourEmail: 'tu@email.com',
    messageSubject: 'Asunto',
    projectMessage: 'Cuéntame sobre el proyecto…',
    sendMessageBtn: 'Enviar',
    sending: 'Enviando…',
    messageSent: 'Mensaje enviado.',
    messageError: 'No se pudo enviar. Inténtalo de nuevo.',

    madeWith: 'Luan Belon',
    by: '—',
    allRights: 'Todos los derechos reservados.',
    frontendDeveloper: 'Frontend',
    uxDesigner: 'Diseñador UX',
    systemsAnalyst: 'Analista de Sistemas',

    accessibility: 'Accesibilidad',
    accessibilityControls: 'Controles de accesibilidad',
    fontSize: 'Tamaño de fuente',
    increaseFontSize: 'Aumentar fuente',
    decreaseFontSize: 'Disminuir fuente',
    highContrast: 'Alto contraste',
    toggleHighContrast: 'Alternar alto contraste',
    reset: 'Restablecer',

    linkInDevelopment: 'Enlace en desarrollo',
    linkDescription: 'Este destino aún no está disponible.',
    formInDevelopment: 'Formulario en desarrollo',
    formDescription: 'Esta funcionalidad aún no ha sido implementada.',
    featureInDevelopment: 'Funcionalidad en desarrollo',
    featureDescription: 'Esta funcionalidad aún no ha sido implementada.',
  },
  de: {
    home: 'Start',
    work: 'Arbeit',
    articles: 'Artikel',
    resume: 'Lebenslauf',
    downloadResume: 'PDF herunterladen',
    resumeFileName: 'Luan-Belon-Lebenslauf',
    contact: 'Kontakt',
    skills: 'Über mich',
    testimonials: 'Stimmen',

    heroTitle: 'Luan Belon',
    heroSubtitle: 'Frontend-Ingenieur und UX/UI Designer',
    heroDescription: 'Ich übersetze Geschäftsanforderungen und Design in schnelle, barrierefreie Interfaces, die konvertieren: Websites, Shops und digitale Produkte.',
    heroManifesto: 'Ich helfe Marken, sich im digitalen Zeitalter abzuheben.',
    heroLocation: 'Salvador, Brasilien',
    availability: 'Arbeitet aus Brasilien · verfügbar für Remote-Arbeit und Freelance',
    heroDiscipline: 'Frontend · UX',
    heroRoles: ['UX/UI Designer', 'Frontend-Ingenieur', 'WordPress-Entwickler'],
    viewWork: 'Arbeit ansehen',
    viewProjects: 'Arbeit ansehen',
    hireMe: 'Beauftragen',
    getInTouch: 'Kontakt',
    siteTitle: 'Luan Belon — Frontend-Ingenieur und UX/UI Designer',
    siteDescription: 'Luan Belon — Frontend-Ingenieur und UX/UI Designer. Arbeitet aus Brasilien, verfügbar für Remote-Arbeit und Freelance. Websites, E-Commerce und digitale Produkte von Figma bis Code. 47 Freelancer-Bewertungen mit 5.0.',
    menu: 'Menü',
    skipToContent: 'Zum Inhalt springen',
    languageLabel: 'Sprache',
    resumeMetaDescription: 'Lebenslauf von Luan Belon — Frontend-Ingenieur und UX/UI Designer. Arbeitet aus Brasilien, verfügbar für Remote-Arbeit und Freelance. Angular, React, WordPress und Figma.',
    geoFactsTitle: 'Berufliche Fakten',
    geoFactRole: 'Rolle',
    geoFactLocation: 'Standort',
    geoFactAvailability: 'Verfügbarkeit',
    geoFactServices: 'Leistungen',
    geoFactExperience: 'Erfahrung',
    geoFactExperienceValue: '8+ Jahre · 47 Freelancer-Bewertungen mit 5.0',
    geoFactServicesValue: 'Websites, E-Commerce, UX/UI, WordPress, Angular und React',
    education: 'Ausbildung',
    eduMba: 'MBA in UX',
    eduDegree: 'Internet-Systeme',
    eduCubos: 'UX/UI Design',
    eduUdacity: 'Nanodegree Digitales Marketing',
    research: 'Recherche',
    roleFounder: 'Gründer',
    roleCeo: 'CEO',
    rolePm: 'Product Manager',
    roleClient: 'Kunde',

    aboutTitle: 'Über mich',
    geoIntro: 'Luan Belon ist Frontend-Ingenieur und UX/UI Designer mit Schwerpunkt auf Angular, WordPress und barrierefreien Web-Interfaces.',
    geoIntroExtended: 'Seine Arbeit umfasst Unternehmenswebsites, Webanwendungen, E-Commerce, Interface-Design und digitale Produkte für Kunden in Brasilien und international.',
    expertiseTitle: 'Expertise',
    expertiseLead: 'Bereiche, in denen Luan Belon als Frontend-Ingenieur und UX/UI Designer arbeitet.',
    expSkill1Title: 'Frontend Engineering',
    expSkill1Desc: 'Interface-Entwicklung mit Angular, React, TypeScript und JavaScript — wiederverwendbare Komponenten, Performance und Wartbarkeit.',
    expSkill2Title: 'Angular',
    expSkill2Desc: 'Skalierbare Anwendungen, API-Anbindung und business-orientierte Frontend-Lösungen.',
    expSkill3Title: 'WordPress und E-Commerce',
    expSkill3Desc: 'Websites und Shops mit WordPress, WooCommerce und Elementor — vom Layout bis zum produktiven Code.',
    expSkill4Title: 'UX/UI Design',
    expSkill4Desc: 'Research, Wireframes, Prototypen und Design Systems in Figma für klare, nutzbare digitale Produkte.',
    expSkill5Title: 'Barrierefreiheit und technisches SEO',
    expSkill5Desc: 'Barrierefreie Interfaces, semantisches HTML, Performance, Structured Data und Auffindbarkeit in Suche und generativen Systemen.',
    aboutLead: 'Frontend-Ingenieur mit MBA in UX und acht Jahren Web. Ich verwandle Design und Geschäftsanforderungen in Websites, Shops und Produkte — von Figma bis Code, mit Performance, Barrierefreiheit und Termintreue. Ich arbeite aus Brasilien und bin verfügbar für Remote-Arbeit und Freelance.',
    skillsTitle: 'Kompetenzen',
    frontendDev: 'Frontend',
    designUx: 'UX und Interface',
    cmsEcommerce: 'CMS und E-Commerce',
    professionalExperience: 'Werdegang',
    present: 'heute',
    proofYears: 'Jahre Erfahrung',
    proofReviews: 'Freelancer-Bewertungen',
    proofRating: 'Durchschnittsnote',
    proofOnTime: 'pünktliche Lieferung',
    proofMba: 'in UX',
    exp1_role: 'Frontend-Ingenieur',
    exp1_desc: 'Bei Netra setze ich Geschäftsanforderungen und Design mit Angular, TypeScript, JavaScript und WordPress um. Fokus auf Performance, Barrierefreiheit und Code, den das Team halten kann.',
    exp2_role: 'Front-end-Entwickler und UX (Freelance)',
    exp2_desc: 'Seit 2017 auf Freelancer.com: 47 Bewertungen mit 5.0. Websites und Shops für Kunden in den USA, Mexiko und Brasilien. Figma zu WordPress, WooCommerce, Elementor, SEO und Optimierung.',
    exp3_role: 'WordPress-Entwickler',
    exp3_desc: 'Websites und Shops mit WordPress, Elementor und WooCommerce.',
    exp4_role: 'WordPress-Entwickler',
    exp4_desc: 'Responsive Sites und Layouts für Agenturkunden, vom Visual zum HTML, CSS und JavaScript.',

    selectedWork: 'Ausgewählte Arbeit',
    selectedWorkLead: 'Eine Auswahl an Sites, Cases und Prototypen. Der Rest steht im Index.',
    viewAllWork: 'Alle Arbeiten',
    workTitle: 'Arbeit',
    workLead: 'Websites, Shops und digitale Produkte — von Figma bis Code.',
    all: 'Alle',
    emptyWork: 'In diesem Filter gibt es noch keine Arbeit.',
    backToWork: 'Zurück zur Arbeit',
    liveSite: 'Website ansehen',
    openFigma: 'In Figma öffnen',
    readOnMedium: 'Auf Medium lesen',
    beforeLabel: 'Vorher',
    afterLabel: 'Nachher',
    yearLabel: 'Jahr',
    clientLabel: 'Kunde',
    roleLabel: 'Rolle',
    galleryLabel: 'Galerie',
    prototypeLabel: 'Prototyp',

    typeWebsite: 'Website',
    typeBeforeAfter: 'Vorher und nachher',
    typeLayout: 'Layout',
    typeCaseStudy: 'UX/UI Case',
    typePrototype: 'Prototyp',
    typeArticle: 'Artikel',

    articlesTitle: 'Texte',
    articlesLead: 'Notizen und Artikel auf Medium zu Produkt, Interface und Frontend.',
    recentWriting: 'Aktuelle Texte',
    emptyArticles: 'Noch keine Artikel veröffentlicht.',

    testimonialsTitle: 'Stimmen',
    testimonial1: 'Luans Arbeit hat meine Erwartungen erfüllt; ich fand Design und Struktur großartig. Ich werde weiter mit dir zusammenarbeiten, um meine Website zu verbessern.',
    testimonial2: 'Luan ist engagiert, geduldig und fleißig. Die Zusammenarbeit hat uns Freude gemacht, und wir sind mit den Ergebnissen sehr zufrieden.',
    testimonial3: 'Luan ist der Beste. Ein talentierter, geduldiger und engagierter Profi. Die Website, die er für uns gebaut hat, ist beeindruckend; er hat das Briefing eingehalten und Änderungen umgesetzt. Wir werden ihn wieder beauftragen.',
    testimonial4: 'Die Zusammenarbeit mit Luan hat mir sehr gefallen; ich werde mich auf jeden Fall wieder melden.',
    testimonial5: 'Ein ausgezeichneter Profi. Er hat die Website wie im Figma-Layout geliefert, in der Hälfte der Zeit, und alle gewünschten Änderungen gemacht.',
    previousTestimonial: 'Vorheriges Testimonial',
    nextTestimonial: 'Nächstes Testimonial',
    goToTestimonial: 'Zum Testimonial',

    hireMeTitle: 'Kontakt',
    workTogether: 'Lassen Sie uns das nächste Projekt bauen.',
    contactDescription: 'Arbeitet aus Brasilien, verfügbar für Remote-Arbeit und Freelance. Websites, E-Commerce und digitale Produkte — Figma zu WordPress oder Frontend in Angular und React.',
    socialNetworks: 'Netzwerke',
    sendMessage: 'Nachricht',
    name: 'Name',
    email: 'E-Mail',
    subject: 'Betreff',
    message: 'Nachricht',
    yourName: 'Ihr Name',
    yourEmail: 'you@email.com',
    messageSubject: 'Betreff',
    projectMessage: 'Erzählen Sie mir vom Projekt…',
    sendMessageBtn: 'Senden',
    sending: 'Wird gesendet…',
    messageSent: 'Nachricht gesendet.',
    messageError: 'Senden fehlgeschlagen. Bitte erneut versuchen.',

    madeWith: 'Luan Belon',
    by: '—',
    allRights: 'Alle Rechte vorbehalten.',
    frontendDeveloper: 'Frontend',
    uxDesigner: 'UX Designer',
    systemsAnalyst: 'Systemanalytiker',

    accessibility: 'Barrierefreiheit',
    accessibilityControls: 'Barrierefreiheits-Einstellungen',
    fontSize: 'Schriftgröße',
    increaseFontSize: 'Schrift vergrößern',
    decreaseFontSize: 'Schrift verkleinern',
    highContrast: 'Hoher Kontrast',
    toggleHighContrast: 'Hohen Kontrast umschalten',
    reset: 'Zurücksetzen',

    linkInDevelopment: 'Link in Entwicklung',
    linkDescription: 'Dieses Ziel ist noch nicht verfügbar.',
    formInDevelopment: 'Formular in Entwicklung',
    formDescription: 'Diese Funktion ist noch nicht umgesetzt.',
    featureInDevelopment: 'Funktion in Entwicklung',
    featureDescription: 'Diese Funktion ist noch nicht umgesetzt.',
  },
};

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'es', 'de'];
export const DEFAULT_LANGUAGE = 'en';

export function getTranslation(language, key) {
  return translations[language]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
}

// Only an explicit choice made in the language toggle is persisted here.
// Auto-detection is never written to this key, so a visitor is re-detected
// on each visit until they pick a language themselves.
const CHOICE_STORAGE_KEY = 'portfolio-language-choice';
// Legacy key from the previous implementation, which also stored detection
// results. It is removed so old visitors go through detection again.
const LEGACY_STORAGE_KEY = 'portfolio-language';
// Detection result is cached per browser session to avoid a lookup on every
// page load.
const DETECTED_SESSION_KEY = 'portfolio-detected-language';

const DETECTION_TIMEOUT_MS = 2500;
const REQUEST_TIMEOUT_MS = 2000;

const COUNTRY_LANGUAGES = {
  pt: ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'],
  es: [
    'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO',
    'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ', 'PR',
  ],
  de: ['DE', 'AT', 'CH', 'LI'],
};

export function languageForCountry(countryCode) {
  const code = String(countryCode || '').toUpperCase();
  if (!code) {
    return DEFAULT_LANGUAGE;
  }
  const match = Object.entries(COUNTRY_LANGUAGES).find(([, countries]) => countries.includes(code));
  return match ? match[0] : DEFAULT_LANGUAGE;
}

async function fetchJsonWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

// Primary: our own edge/serverless endpoint, which reads the country header
// injected by the hosting platform (no third-party call, no rate limits).
// Fallback: ipapi.co, used in local development or if the primary fails.
async function detectCountry() {
  try {
    const data = await fetchJsonWithTimeout('/api/geo', REQUEST_TIMEOUT_MS);
    if (data?.country) {
      return data.country;
    }
  } catch (error) {
    // fall through to the public API
  }

  try {
    const data = await fetchJsonWithTimeout('https://ipapi.co/json/', REQUEST_TIMEOUT_MS);
    return data?.country_code || null;
  } catch (error) {
    return null;
  }
}

async function detectLanguage() {
  const timeout = new Promise((resolve) => {
    window.setTimeout(() => resolve(DEFAULT_LANGUAGE), DETECTION_TIMEOUT_MS);
  });
  const detection = detectCountry().then(languageForCountry);
  return Promise.race([detection, timeout]);
}

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch (error) {
    // Storage may be unavailable (private mode, disabled cookies). Ignore.
  }
}

function removeStorage(storage, key) {
  try {
    storage.removeItem(key);
  } catch (error) {
    // ignore
  }
}

export const LanguageProvider = ({ children, initialLanguage = DEFAULT_LANGUAGE, ssr = false }) => {
  const [language, setLanguage] = useState(
    SUPPORTED_LANGUAGES.includes(initialLanguage) ? initialLanguage : DEFAULT_LANGUAGE,
  );
  const [isLoading, setIsLoading] = useState(!ssr);

  useEffect(() => {
    if (ssr) {
      return undefined;
    }

    let cancelled = false;

    const initializeLanguage = async () => {
      removeStorage(window.localStorage, LEGACY_STORAGE_KEY);

      const chosen = readStorage(window.localStorage, CHOICE_STORAGE_KEY);
      if (chosen && SUPPORTED_LANGUAGES.includes(chosen)) {
        setLanguage(chosen);
        setIsLoading(false);
        return;
      }

      const cached = readStorage(window.sessionStorage, DETECTED_SESSION_KEY);
      if (cached && SUPPORTED_LANGUAGES.includes(cached)) {
        setLanguage(cached);
        setIsLoading(false);
        return;
      }

      const detected = await detectLanguage();
      if (cancelled) {
        return;
      }
      setLanguage(detected);
      writeStorage(window.sessionStorage, DETECTED_SESSION_KEY, detected);
      setIsLoading(false);
    };

    initializeLanguage();

    return () => {
      cancelled = true;
    };
  }, []);

  const changeLanguage = (newLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(newLanguage)) {
      setLanguage(newLanguage);
      writeStorage(window.localStorage, CHOICE_STORAGE_KEY, newLanguage);
    }
  };

  const t = (key) => getTranslation(language, key);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isLoading }}>
      {isLoading ? <div className="min-h-screen bg-ink" aria-busy="true" /> : children}
    </LanguageContext.Provider>
  );
};
