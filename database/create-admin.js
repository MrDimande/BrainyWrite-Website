// Script to create admin user
// Run with: node database/create-admin.js

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'brainywrite_db',
  password: process.env.PGPASSWORD || '',
  port: process.env.PGPORT || 5432,
});

async function createAdmin() {
  const username = process.argv[2] || 'admin';
  const email = process.argv[3] || 'admin@brainywrite.com';
  const password = process.argv[4] || 'admin123';

  try {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert admin user
    const result = await pool.query(
      `INSERT INTO admin_users (username, email, password_hash, role, is_active)
       VALUES ($1, $2, $3, 'admin', true)
       ON CONFLICT (username) DO UPDATE SET
         password_hash = EXCLUDED.password_hash,
         email = EXCLUDED.email,
         updated_at = NOW()
       RETURNING id, username, email, role`,
      [username, email, passwordHash]
    );

    console.log('✅ Admin user created/updated successfully!');
    console.log('Username:', result.rows[0].username);
    console.log('Email:', result.rows[0].email);
    console.log('Password:', password);
    console.log('\n⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    if (error.message.includes('does not exist')) {
      console.log('\n💡 Tip: Run the database schema first: psql -d brainywrite_db -f database/schema.sql');
    }
  } finally {
    await pool.end();
  }
}

// Run the function
createAdmin().catch(console.error);

