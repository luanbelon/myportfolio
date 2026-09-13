function readCountry(req) {
  const headers = req.headers || {};
  const raw =
    headers['x-vercel-ip-country'] ||
    headers['cf-ipcountry'] ||
    headers['cloudfront-viewer-country'] ||
    null;

  if (!raw) {
    return null;
  }

  const code = String(raw).trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : null;
}

function handleGeo(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ country: readCountry(req) });
}

module.exports = { handleGeo, readCountry };
