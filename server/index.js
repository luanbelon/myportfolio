require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SESSION_DURATION_MS,
  signAdminToken,
  verifyAdminToken,
  readBearerToken,
} = require('../api/_lib/auth');
const { ensureSchema } = require('../api/_lib/schema');
const { ensureDefaultProjectsSeeded } = require('../api/_lib/seed-defaults');
const { handleGet, handlePost, handlePut, handleDelete } = require('../api/_lib/projects');
const db = require('../api/_lib/db');

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '8mb' }));

function requireAdminAuth(req, res, next) {
  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.admin = payload;
  next();
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
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
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
    await ensureSchema();
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

app.get('/api/projects', handleGet);
app.post('/api/projects', handlePost);
app.put('/api/projects', handlePut);
app.delete('/api/projects', handleDelete);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
