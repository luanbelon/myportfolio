const db = require('./db');

let initialized = false;
let initializingPromise = null;

const schemaSql = `
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title_pt TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  category VARCHAR(40) NOT NULL,
  github_url TEXT,
  live_url TEXT,
  image_key VARCHAR(80),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS project_tags (
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY(project_id, tag_id)
);

CREATE TABLE IF NOT EXISTS project_translations (
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(project_id, language)
);
`;

async function ensureSchema() {
  if (initialized) {
    return;
  }
  if (initializingPromise) {
    await initializingPromise;
    return;
  }

  initializingPromise = db.query(schemaSql)
    .then(() => {
      initialized = true;
    })
    .finally(() => {
      initializingPromise = null;
    });

  await initializingPromise;
}

module.exports = { ensureSchema };
