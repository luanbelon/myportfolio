const db = require('./_lib/db');
const { verifyAdminToken, readBearerToken } = require('./_lib/auth');
const { ensureSchema } = require('./_lib/schema');
const { ensureDefaultProjectsSeeded } = require('./_lib/seed-defaults');

module.exports = async function handler(req, res) {
  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    if (req.method === 'GET') {
      const result = await db.query('SELECT id, name FROM tags ORDER BY name ASC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { name } = req.body || {};
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Tag name is required' });
      }

      const normalizedName = name.trim();
      const result = await db.query(
        `INSERT INTO tags (name)
         VALUES ($1)
         ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING id, name`,
        [normalizedName]
      );

      return res.status(201).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch tags: ${error.message}` });
  }
};
