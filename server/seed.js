const db = require('./db');

const projects = [
  {
    slug: 'sunbeat-energy',
    title_pt: 'Sunbeat Energy',
    description_pt: 'Landing page para uma empresa que vende serviços de energia.',
    category: 'wordpress',
    live_url: 'https://sunbeatenergy.com/en/',
    github_url: null,
    image_key: 'sunbeat',
    tags: ['Wordpress', 'JavaScript', 'CSS', 'Elementor'],
  },
  {
    slug: 'overall-contractors',
    title_pt: 'Overall Contractors',
    description_pt: 'Criação de site wordpress para empresa de construção',
    category: 'wordpress',
    live_url: 'https://overallcontractors.com/',
    github_url: null,
    image_key: 'overall',
    tags: ['Wordpress', 'Elementor'],
  },
  {
    slug: 'caricoos',
    title_pt: 'Site Corporativo',
    description_pt: 'Website institucional responsivo com CMS personalizado.',
    category: 'frontend',
    live_url: null,
    github_url: null,
    image_key: 'caricoos',
    tags: ['HTML', 'CSS'],
  },
  {
    slug: 'ecofit-prototipo',
    title_pt: 'Prototipo mobile ecofit',
    description_pt: 'Criação de prototipo com figma para app de academia fitness',
    category: 'ux',
    live_url: 'https://www.figma.com/proto/rXS7eW5f4cgJJ1cNbTMMcX?node-id=0-1&t=4xgHtBBvxSOnHK5D-6',
    github_url: null,
    image_key: 'ecofit',
    tags: ['Figma', 'UX/UI'],
  },
  {
    slug: 'coleta-facil',
    title_pt: 'Coleta Fácil',
    description_pt: 'Projeto UX, desenvolver desde pesquisas para entender o usuario até o prototivo navegavel do projeto que visa facilitar a forma que as pessoas podem levar seu lixo para a reciclagem.',
    category: 'ux',
    live_url: 'https://www.figma.com/proto/idNnluwy8mXe2hoSEAOpNQ/Coleta-F%C3%A1cil---App?node-id=134-343&starting-point-node-id=189%3A1518',
    github_url: null,
    image_key: 'coletafacil',
    tags: ['Figma', 'UX/UI'],
  },
  {
    slug: 'black-forest-food',
    title_pt: 'Black Forest Food',
    description_pt: 'Pagina para restaurante no Colorado, a pagina deixou o negocio mais atrativo e com isso mais clientes começaram a fazer pedidos online.',
    category: 'wordpress',
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
      `INSERT INTO projects (slug, title_pt, description_pt, category, github_url, live_url, image_key)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO UPDATE
       SET title_pt = EXCLUDED.title_pt,
           description_pt = EXCLUDED.description_pt,
           category = EXCLUDED.category,
           github_url = EXCLUDED.github_url,
           live_url = EXCLUDED.live_url,
           image_key = EXCLUDED.image_key,
           updated_at = NOW()
       RETURNING id`,
      [
        project.slug,
        project.title_pt,
        project.description_pt,
        project.category,
        project.github_url,
        project.live_url,
        project.image_key,
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
