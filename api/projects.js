const db = require('./_lib/db');
const { translateText } = require('./_lib/translate');
const { verifyAdminToken, readBearerToken } = require('./_lib/auth');
const { ensureSchema } = require('./_lib/schema');
const { ensureDefaultProjectsSeeded } = require('./_lib/seed-defaults');

function normalizeLanguage(language) {
  if (language === 'en' || language === 'es') {
    return language;
  }
  return 'pt';
}

async function getOrCreateTranslation(project, language) {
  if (language === 'pt') {
    return {
      title: project.title_pt,
      description: project.description_pt,
    };
  }

  const cached = await db.query(
    `SELECT title, description
     FROM project_translations
     WHERE project_id = $1 AND language = $2`,
    [project.id, language]
  );

  if (cached.rows[0]) {
    return cached.rows[0];
  }

  const [title, description] = await Promise.all([
    translateText(project.title_pt, language),
    translateText(project.description_pt, language),
  ]);

  await db.query(
    `INSERT INTO project_translations (project_id, language, title, description, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (project_id, language)
     DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = NOW()`,
    [project.id, language, title, description]
  );

  return { title, description };
}

async function handleGet(req, res) {
  const language = normalizeLanguage(req.query.lang);

  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    const result = await db.query(
      `SELECT p.*,
              COALESCE(
                json_agg(
                  json_build_object('id', t.id, 'name', t.name)
                  ORDER BY t.name
                ) FILTER (WHERE t.id IS NOT NULL),
                '[]'
              ) AS tags
       FROM projects p
       LEFT JOIN project_tags pt ON pt.project_id = p.id
       LEFT JOIN tags t ON t.id = pt.tag_id
       GROUP BY p.id
       ORDER BY p.created_at DESC`
    );

    const payload = [];
    for (const project of result.rows) {
      const translation = await getOrCreateTranslation(project, language);
      payload.push({
        id: project.id,
        slug: project.slug,
        title: translation.title,
        description: translation.description,
        category: project.category,
        github: project.github_url,
        live: project.live_url,
        imageKey: project.image_key,
        imageUrl: project.image_url,
        technologies: project.tags.map((tag) => tag.name),
      });
    }

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch projects: ${error.message}` });
  }
}

async function handlePost(req, res) {
  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    title,
    description,
    category,
    github,
    live,
    imageKey,
    imageUrl,
    tagIds = [],
  } = req.body || {};

  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description and category are required' });
  }

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90);

  const client = await db.pool.connect();
  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    await client.query('BEGIN');
    const insertProject = await client.query(
      `INSERT INTO projects (slug, title_pt, description_pt, category, github_url, live_url, image_key, image_url, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW())
       RETURNING id`,
      [slug, title, description, category, github || null, live || null, imageKey || null, imageUrl || null]
    );

    const projectId = insertProject.rows[0].id;
    for (const tagId of tagIds) {
      await client.query(
        `INSERT INTO project_tags (project_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [projectId, Number(tagId)]
      );
    }

    await client.query('COMMIT');
    return res.status(201).json({ ok: true, id: projectId });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: `Failed to create project: ${error.message}` });
  } finally {
    client.release();
  }
}

async function handlePut(req, res) {
  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    id,
    title,
    description,
    category,
    github,
    live,
    imageKey,
    imageUrl,
    tagIds = [],
  } = req.body || {};

  if (!id || !title || !description || !category) {
    return res.status(400).json({ error: 'Id, title, description and category are required' });
  }

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90);

  const client = await db.pool.connect();
  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    await client.query('BEGIN');

    const updateResult = await client.query(
      `UPDATE projects
       SET slug = $1,
           title_pt = $2,
           description_pt = $3,
           category = $4,
           github_url = $5,
           live_url = $6,
           image_key = $7,
           image_url = $8,
           updated_at = NOW()
       WHERE id = $9
       RETURNING id`,
      [slug, title, description, category, github || null, live || null, imageKey || null, imageUrl || null, Number(id)]
    );

    if (!updateResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Project not found' });
    }

    await client.query('DELETE FROM project_tags WHERE project_id = $1', [Number(id)]);
    for (const tagId of tagIds) {
      await client.query(
        `INSERT INTO project_tags (project_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [Number(id), Number(tagId)]
      );
    }

    await client.query('DELETE FROM project_translations WHERE project_id = $1', [Number(id)]);
    await client.query('COMMIT');
    return res.status(200).json({ ok: true, id: Number(id) });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: `Failed to update project: ${error.message}` });
  } finally {
    client.release();
  }
}

async function handleDelete(req, res) {
  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = Number(req.query.id);
  if (!id) {
    return res.status(400).json({ error: 'Project id is required' });
  }

  try {
    await ensureSchema();
    const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: `Failed to delete project: ${error.message}` });
  }
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  }

  if (req.method === 'POST') {
    return handlePost(req, res);
  }

  if (req.method === 'PUT') {
    return handlePut(req, res);
  }

  if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
