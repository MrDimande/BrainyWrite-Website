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
    const sqlPath = path.join(__dirname, 'setup_completo.sql');
    console.log(`Reading SQL file from: ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing SQL script...');
    await pool.query(sql);
    console.log('Database updated successfully.');
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
