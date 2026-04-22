const crypto = require('crypto');

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

function readBearerToken(req) {
  const authorization = req.headers.authorization || '';
  return authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
}

module.exports = {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SESSION_DURATION_MS,
  signAdminToken,
  verifyAdminToken,
  readBearerToken,
};
