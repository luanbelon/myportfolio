const db = require('./db');

const projects = [
  {
    slug: 'sunbeat-energy',
    title_pt: 'Sunbeat Energy',
    description_pt: 'Landing page para uma empresa que vende serviços de energia.',
    excerpt_pt: 'Landing page institucional para empresa de energia solar.',
    category: 'wordpress',
    type: 'website',
    featured: true,
    live_url: 'https://sunbeatenergy.com/en/',
    github_url: null,
    image_key: 'sunbeat',
    tags: ['Wordpress', 'JavaScript', 'CSS', 'Elementor'],
  },
  {
    slug: 'overall-contractors',
    title_pt: 'Overall Contractors',
    description_pt: 'Criação de site wordpress para empresa de construção',
    excerpt_pt: 'Site WordPress para empresa de construção.',
    category: 'wordpress',
    type: 'website',
    featured: false,
    live_url: 'https://overallcontractors.com/',
    github_url: null,
    image_key: 'overall',
    tags: ['Wordpress', 'Elementor'],
  },
  {
    slug: 'caricoos',
    title_pt: 'Site Corporativo',
    description_pt: 'Website institucional responsivo com CMS personalizado.',
    excerpt_pt: 'Website institucional responsivo com CMS personalizado.',
    category: 'frontend',
    type: 'website',
    featured: false,
    live_url: null,
    github_url: null,
    image_key: 'caricoos',
    tags: ['HTML', 'CSS'],
  },
  {
    slug: 'ecofit-prototipo',
    title_pt: 'Protótipo mobile Ecofit',
    description_pt: 'Criação de protótipo com Figma para app de academia fitness.',
    excerpt_pt: 'Protótipo navegável no Figma para um app de academia.',
    category: 'ux',
    type: 'prototype',
    featured: true,
    figma_url: 'https://www.figma.com/proto/rXS7eW5f4cgJJ1cNbTMMcX?node-id=0-1&t=4xgHtBBvxSOnHK5D-6',
    live_url: 'https://www.figma.com/proto/rXS7eW5f4cgJJ1cNbTMMcX?node-id=0-1&t=4xgHtBBvxSOnHK5D-6',
    github_url: null,
    image_key: 'ecofit',
    tags: ['Figma', 'UX/UI'],
  },
  {
    slug: 'coleta-facil',
    title_pt: 'Coleta Fácil',
    description_pt: 'Projeto UX, desenvolver desde pesquisas para entender o usuario até o prototivo navegavel do projeto que visa facilitar a forma que as pessoas podem levar seu lixo para a reciclagem.',
    excerpt_pt: 'Case UX do diagnóstico à prototipação de um app de reciclagem.',
    body_pt: 'O Coleta Fácil nasceu da necessidade de reduzir a fricção entre pessoas e pontos de reciclagem. O processo incluiu pesquisa com usuários, definição de fluxos e um protótipo navegável no Figma.',
    category: 'ux',
    type: 'case_study',
    featured: true,
    role: 'UX/UI Designer',
    figma_url: 'https://www.figma.com/proto/idNnluwy8mXe2hoSEAOpNQ/Coleta-F%C3%A1cil---App?node-id=134-343&starting-point-node-id=189%3A1518',
    live_url: 'https://www.figma.com/proto/idNnluwy8mXe2hoSEAOpNQ/Coleta-F%C3%A1cil---App?node-id=134-343&starting-point-node-id=189%3A1518',
    github_url: null,
    image_key: 'coletafacil',
    tags: ['Figma', 'UX/UI'],
  },
  {
    slug: 'black-forest-food',
    title_pt: 'Black Forest Food',
    description_pt: 'Pagina para restaurante no Colorado, a pagina deixou o negocio mais atrativo e com isso mais clientes começaram a fazer pedidos online.',
    excerpt_pt: 'Site para restaurante no Colorado, com foco em pedidos online.',
    category: 'wordpress',
    type: 'website',
    featured: true,
    live_url: 'https://bffdeli.com/wp/',
    github_url: null,
    image_key: 'bffdeli',
    tags: ['Wordpress'],
  },
];

async function upsertTag(name) {
  const result = await db.query(
    `INSERT INTO tags (name) VALUES ($1)
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    [name]
  );
  return result.rows[0].id;
}

async function seed() {
  for (const project of projects) {
    const projectResult = await db.query(
      `INSERT INTO projects (
         slug, title_pt, description_pt, excerpt_pt, body_pt, category, type,
         github_url, live_url, figma_url, image_key, featured, published, role, created_at, updated_at
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true,$13,NOW(),NOW())
       ON CONFLICT (slug) DO UPDATE
       SET title_pt = EXCLUDED.title_pt,
           description_pt = EXCLUDED.description_pt,
           excerpt_pt = EXCLUDED.excerpt_pt,
           body_pt = EXCLUDED.body_pt,
           category = EXCLUDED.category,
           type = EXCLUDED.type,
           github_url = EXCLUDED.github_url,
           live_url = EXCLUDED.live_url,
           figma_url = EXCLUDED.figma_url,
           image_key = EXCLUDED.image_key,
           featured = EXCLUDED.featured,
           role = EXCLUDED.role,
           updated_at = NOW()
       RETURNING id`,
      [
        project.slug,
        project.title_pt,
        project.description_pt,
        project.excerpt_pt || project.description_pt,
        project.body_pt || '',
        project.category,
        project.type,
        project.github_url,
        project.live_url,
        project.figma_url || null,
        project.image_key,
        Boolean(project.featured),
        project.role || null,
      ]
    );

    const projectId = projectResult.rows[0].id;
    await db.query('DELETE FROM project_tags WHERE project_id = $1', [projectId]);

    for (const tagName of project.tags) {
      const tagId = await upsertTag(tagName);
      await db.query(
        `INSERT INTO project_tags (project_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [projectId, tagId]
      );
    }
  }

  console.log('Projects seeded successfully.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Failed to seed projects:', error);
  process.exit(1);
});
