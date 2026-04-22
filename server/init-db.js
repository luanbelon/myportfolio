const fs = require('fs');
const path = require('path');
const db = require('./db');

async function initDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf-8');
  await db.query(sql);
  console.log('Database schema initialized.');
  process.exit(0);
}

initDb().catch((error) => {
  console.error('Failed to initialize database schema:', error);
  process.exit(1);
});
