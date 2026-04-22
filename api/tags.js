const db = require('./_lib/db');
const { verifyAdminToken, readBearerToken } = require('./_lib/auth');
const { ensureSchema } = require('./_lib/schema');
const { ensureDefaultProjectsSeeded } = require('./_lib/seed-defaults');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = readBearerToken(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await ensureSchema();
    await ensureDefaultProjectsSeeded();
    const result = await db.query('SELECT id, name FROM tags ORDER BY name ASC');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch tags: ${error.message}` });
  }
};
