const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();
const db = require('./db');
const { translateText } = require('./translate');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SESSION_SECRET = crypto
  .createHash('sha256')
  .update(`${ADMIN_USERNAME || ''}:${ADMIN_PASSWORD || ''}`)
  .digest('hex');
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function signAdminToken(payload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [encodedPayload, sentSignature] = token.split('.');
  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  if (expectedSignature !== sentSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function requireAdminAuth(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.admin = payload;
  next();
}

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

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin credentials are not configured' });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signAdminToken({
    user: ADMIN_USERNAME,
    exp: Date.now() + SESSION_DURATION_MS,
  });

  res.json({ token });
});

app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  res.json({ ok: true, user: req.admin.user });
});

app.get('/api/tags', requireAdminAuth, async (req, res) => {
  try {
    const result = await db.query('SELECT id, name FROM tags ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

app.post('/api/tags', requireAdminAuth, async (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Tag name is required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO tags (name)
       VALUES ($1)
       ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
       RETURNING id, name`,
      [name.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

app.get('/api/projects', async (req, res) => {
  const language = normalizeLanguage(req.query.lang);

  try {
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

    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', requireAdminAuth, async (req, res) => {
  const {
    title,
    description,
    category,
    github,
    live,
    imageKey,
    imageUrl,
    tagIds = [],
  } = req.body;

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
    res.status(201).json({ ok: true, id: projectId });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to create project' });
  } finally {
    client.release();
  }
});

app.put('/api/projects', requireAdminAuth, async (req, res) => {
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
    res.status(200).json({ ok: true, id: Number(id) });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to update project' });
  } finally {
    client.release();
  }
});

app.delete('/api/projects', requireAdminAuth, async (req, res) => {
  const id = Number(req.query.id);
  if (!id) {
    return res.status(400).json({ error: 'Project id is required' });
  }

  try {
    const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
