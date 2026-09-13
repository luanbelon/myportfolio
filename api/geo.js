const { handleGeo } = require('./_lib/geo');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return handleGeo(req, res);
};
