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

ALTER TABLE projects ADD COLUMN IF NOT EXISTS type VARCHAR(40) DEFAULT 'website';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS year INT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS excerpt_pt TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS body_pt TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS figma_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS medium_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS before_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS after_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS full_page_image_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;

ALTER TABLE project_translations ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE project_translations ADD COLUMN IF NOT EXISTS body TEXT;

UPDATE projects SET type = 'website' WHERE type IS NULL OR type = '';
UPDATE projects SET type = 'case_study' WHERE slug = 'coleta-facil' AND type = 'website';
UPDATE projects SET type = 'prototype' WHERE slug = 'ecofit-prototipo' AND type = 'website';
UPDATE projects SET excerpt_pt = description_pt WHERE excerpt_pt IS NULL OR excerpt_pt = '';
UPDATE projects
SET figma_url = live_url
WHERE (figma_url IS NULL OR figma_url = '')
  AND live_url ILIKE '%figma.com%';
UPDATE projects
SET featured = true
WHERE slug IN ('sunbeat-energy', 'coleta-facil', 'ecofit-prototipo', 'black-forest-food')
  AND NOT EXISTS (SELECT 1 FROM projects p2 WHERE p2.featured = true);`;

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
