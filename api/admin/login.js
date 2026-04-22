const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SESSION_DURATION_MS,
  signAdminToken,
} = require('../_lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  return res.status(200).json({ token });
};
