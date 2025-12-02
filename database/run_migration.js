require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function run() {
  try {
    const sqlPath = path.join(__dirname, 'migrate_fix_schema.sql');
    console.log(`Reading migration file from: ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing migration...');
    await pool.query(sql);
    console.log('Migration completed successfully!');
    console.log('The user_overall_stats view has been updated with new columns.');
  } catch (err) {
    console.error('Error running migration:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
