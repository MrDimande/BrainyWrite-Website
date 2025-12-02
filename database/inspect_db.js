require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function inspect() {
  try {
    // Check if exam_attempts table exists
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'exam_attempts', 'exam_state');
    `);

    console.log('Tables found:', tables.rows.map(r => r.table_name));

    // Get exam_attempts columns
    if (tables.rows.some(r => r.table_name === 'exam_attempts')) {
      const columns = await pool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'exam_attempts'
        ORDER BY ordinal_position;
      `);
      console.log('\nexam_attempts columns:');
      columns.rows.forEach(col => {
        console.log(`  ${col.column_name}: ${col.data_type}`);
      });
    }

    // Get exam_attempts constraints
    if (tables.rows.some(r => r.table_name === 'exam_attempts')) {
      const constraints = await pool.query(`
        SELECT conname, contype, pg_get_constraintdef(oid) as def
        FROM pg_constraint
        WHERE conrelid = 'exam_attempts'::regclass;
      `);
      console.log('\nexam_attempts constraints:');
      constraints.rows.forEach(c => {
        console.log(`  ${c.conname} (${c.contype}): ${c.def}`);
      });
    }

    // Check views
    const views = await pool.query(`
      SELECT table_name
      FROM information_schema.views
      WHERE table_schema = 'public';
    `);
    console.log('\nViews:', views.rows.map(r => r.table_name));

  } catch (err) {
    console.error('Error inspecting database:', err);
  } finally {
    await pool.end();
  }
}

inspect();
