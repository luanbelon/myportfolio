const db = require('./db');
const { translateText } = require('./translate');
const { verifyAdminToken, readBearerToken } = require('./auth');
const { ensureSchema } = require('./schema');
const { ensureDefaultProjectsSeeded } = require('./seed-defaults');

const ALLOWED_TYPES = ['website', 'before_after', 'layout', 'case_study', 'prototype', 'article'];

function normalizeLanguage(language) {
  if (language === 'en' || language === 'es' || language === 'de') {
    return language;
  }
  return 'pt';
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90);
}

function parseGallery(gallery) {
  if (Array.isArray(gallery)) {
    return gallery.filter(Boolean);
  }
  if (typeof gallery === 'string') {
    try {
      const parsed = JSON.parse(gallery);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  }
  return [];
}

function toBool(value, fallback = false) {
  if (value === true || value === 'true' || value === 1 || value === '1') {
    return true;
  }
  if (value === false || value === 'false' || value === 0 || value === '0') {
    return false;
  }
  return fallback;
}

function parseTags(tags) {
  if (Array.isArray(tags)) {
    return tags;
  }
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }
  return [];
}

function mapProject(project, translation) {
  return {
    id: project.id,
    slug: project.slug,
    title: translation.title,
    description: translation.description,
    excerpt: translation.excerpt || translation.description,
    body: translation.body || '',
    type: project.type || 'website',
    category: project.category,
    featured: Boolean(project.featured),
    published: project.published !== false,
    year: project.year,
    client: project.client,
    role: project.role,
    sortOrder: project.sort_order || 0,
    github: project.github_url,
    live: project.live_url,
    figmaUrl: project.figma_url,
    mediumUrl: project.medium_url,
    imageKey: project.image_key,
    imageUrl: project.image_url,
    beforeImageUrl: project.before_image_url,
    afterImageUrl: project.after_image_url,
    gallery: parseGallery(project.gallery),
    technologies: parseTags(project.tags).map((tag) => tag.name),
  };
}

async function getOrCreateTranslation(project, language, includeBody = false) {
  if (language === 'pt') {
    return {
      title: project.title_pt,
      description: project.description_pt,
      excerpt: project.excerpt_pt || project.description_pt,
      body: includeBody ? (project.body_pt || '') : '',
    };
  }

  const cached = await db.query(
    `SELECT title, description, excerpt, body
     FROM project_translations
     WHERE project_id = $1 AND language = $2`,
    [project.id, language]
  );

  if (cached.rows[0]) {
    return {
      title: cached.rows[0].title,
      description: cached.rows[0].description,
      excerpt: cached.rows[0].excerpt || cached.rows[0].description,
      body: includeBody ? (cached.rows[0].body || '') : '',
    };
  }

  const [title, description, excerpt, body] = await Promise.all([
    translateText(project.title_pt, language),
    translateText(project.description_pt, language),
    translateText(project.excerpt_pt || project.description_pt, language),
    includeBody ? translateText(project.body_pt || '', language) : Promise.resolve(''),
  ]);

  await db.query(
    `INSERT INTO project_translations (project_id, language, title, description, excerpt, body, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     ON CONFLICT (project_id, language)
     DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       excerpt = EXCLUDED.excerpt,
       body = EXCLUDED.body,
       updated_at = NOW()`,
    [project.id, language, title, description, excerpt, body]
  );

  return { title, description, excerpt, body };
}

async function fetchProjectRows({ slug, type, featured, includeUnpublished }) {
  const filters = [];
  const values = [];

  if (!includeUnpublished) {
    filters.push('p.published = true');
  }
  if (slug) {
    values.push(slug);
    filters.push(`p.slug = $${values.length}`);
  }
  if (type && ALLOWED_TYPES.includes(type)) {
    values.push(type);
    filters.push(`p.type = $${values.length}`);
  }
  if (featured) {
    filters.push('p.featured = true');
  }

  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

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
     ${where}
     GROUP BY p.id
     ORDER BY p.sort_order ASC, p.created_at DESC`,
    values
  );

  return result.rows;
}

function readProjectPayload(body) {
  const type = ALLOWED_TYPES.includes(body.type) ? body.type : 'website';
  return {
    title: body.title,
    description: body.description,
    excerpt: body.excerpt || body.description,
    bodyText: body.body || '',
    type,
    category: body.category || type,
    github: body.github || null,
    live: body.live || null,
    imageKey: body.imageKey || null,
    imageUrl: body.imageUrl || null,
    figmaUrl: body.figmaUrl || null,
    mediumUrl: body.mediumUrl || null,
    beforeImageUrl: body.beforeImageUrl || null,
    afterImageUrl: body.afterImageUrl || null,
    gallery: JSON.stringify(parseGallery(body.gallery)),
    featured: toBool(body.featured, false),
    published: toBool(body.published, true),
    year: body.year ? Number(body.year) : null,
    client: body.client || null,
    role: body.role || null,
    sortOrder: body.sortOrder ? Number(body.sortOrder) : 0,
    tagIds: Array.isArray(body.tagIds) ? body.tagIds : [],
  };
}

async function handleGet(req, res) {
  const language = normalizeLanguage(req.query.lang);
  const slug = req.query.slug;
  const type = req.query.type;
  const featured = toBool(req.query.featured, false);
  const token = readBearerToken(req);
  const admin = Boolean(verifyAdminToken(token));
  const includeUnpublished = admin && toBool(req.query.admin, false);

  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    const rows = await fetchProjectRows({
      slug,
      type,
      featured,
      includeUnpublished,
    });

    if (slug && !rows[0]) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const includeBody = Boolean(slug) || includeUnpublished;
    const payload = [];
    for (const project of rows) {
      const translation = await getOrCreateTranslation(project, language, includeBody);
      payload.push(mapProject(project, translation));
    }

    if (slug) {
      return res.status(200).json(payload[0]);
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

  const data = readProjectPayload(req.body || {});
  if (!data.title || !data.description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const slug = slugify(data.title);
  const client = await db.pool.connect();
  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    await client.query('BEGIN');
    const insertProject = await client.query(
      `INSERT INTO projects (
         slug, title_pt, description_pt, excerpt_pt, body_pt, category, type,
         github_url, live_url, image_key, image_url, figma_url, medium_url,
         before_image_url, after_image_url, gallery, featured, published,
         year, client, role, sort_order, created_at, updated_at
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17,$18,$19,$20,$21,$22,NOW(),NOW())
       RETURNING id`,
      [
        slug,
        data.title,
        data.description,
        data.excerpt,
        data.bodyText,
        data.category,
        data.type,
        data.github,
        data.live,
        data.imageKey,
        data.imageUrl,
        data.figmaUrl,
        data.mediumUrl,
        data.beforeImageUrl,
        data.afterImageUrl,
        data.gallery,
        data.featured,
        data.published,
        data.year,
        data.client,
        data.role,
        data.sortOrder,
      ]
    );

    const projectId = insertProject.rows[0].id;
    for (const tagId of data.tagIds) {
      await client.query(
        `INSERT INTO project_tags (project_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [projectId, Number(tagId)]
      );
    }

    await client.query('COMMIT');
    return res.status(201).json({ ok: true, id: projectId, slug });
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

  const data = readProjectPayload(req.body || {});
  const id = Number(req.body?.id);
  if (!id || !data.title || !data.description) {
    return res.status(400).json({ error: 'Id, title and description are required' });
  }

  const slug = req.body.slug ? slugify(req.body.slug) : slugify(data.title);
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
           excerpt_pt = $4,
           body_pt = $5,
           category = $6,
           type = $7,
           github_url = $8,
           live_url = $9,
           image_key = $10,
           image_url = $11,
           figma_url = $12,
           medium_url = $13,
           before_image_url = $14,
           after_image_url = $15,
           gallery = $16::jsonb,
           featured = $17,
           published = $18,
           year = $19,
           client = $20,
           role = $21,
           sort_order = $22,
           updated_at = NOW()
       WHERE id = $23
       RETURNING id`,
      [
        slug,
        data.title,
        data.description,
        data.excerpt,
        data.bodyText,
        data.category,
        data.type,
        data.github,
        data.live,
        data.imageKey,
        data.imageUrl,
        data.figmaUrl,
        data.mediumUrl,
        data.beforeImageUrl,
        data.afterImageUrl,
        data.gallery,
        data.featured,
        data.published,
        data.year,
        data.client,
        data.role,
        data.sortOrder,
        id,
      ]
    );

    if (!updateResult.rows[0]) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Project not found' });
    }

    await client.query('DELETE FROM project_tags WHERE project_id = $1', [id]);
    for (const tagId of data.tagIds) {
      await client.query(
        `INSERT INTO project_tags (project_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [id, Number(tagId)]
      );
    }

    await client.query('DELETE FROM project_translations WHERE project_id = $1', [id]);
    await client.query('COMMIT');
    return res.status(200).json({ ok: true, id, slug });
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

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
};
