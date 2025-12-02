const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupExamTables() {
  console.log('🚀 Iniciando configuração das tabelas de exames...\n');

  // Configuração do PostgreSQL
  const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'brainywrite_db',
    password: process.env.PGPASSWORD || '',
    port: process.env.PGPORT || 5432,
  });

  try {
    // Testar conexão
    console.log('📡 Testando conexão com PostgreSQL...');
    await pool.query('SELECT NOW()');
    console.log('✅ Conexão estabelecida com sucesso!\n');

    // Ler o arquivo SQL
    console.log('📄 Lendo arquivo SQL...');
    const sqlFilePath = path.join(__dirname, '..', 'database', 'exam_schema.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    console.log('✅ Arquivo SQL carregado!\n');

    // Executar o SQL
    console.log('⚙️  Executando SQL...');
    await pool.query(sql);
    console.log('✅ SQL executado com sucesso!\n');

    // Verificar tabelas criadas
    console.log('🔍 Verificando tabelas criadas...');
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'exam_attempts', 'user_subject_progress', 'certificates', 'exam_states')
      ORDER BY table_name
    `);

    if (result.rows.length === 5) {
      console.log('✅ Todas as 5 tabelas foram criadas com sucesso:\n');
      result.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    } else {
      console.log(`⚠️  Apenas ${result.rows.length} de 5 tabelas foram criadas:`);
      result.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    }

    console.log('\n🎉 Configuração concluída com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Reinicie o servidor backend: npm run server');
    console.log('   2. Teste o registro de usuário: POST /api/auth/register');
    console.log('   3. Faça login: POST /api/auth/login');
    console.log('   4. Salve uma tentativa de exame: POST /api/exams/attempt\n');

  } catch (error) {
    console.error('❌ Erro durante a configuração:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Solução: Certifique-se que o PostgreSQL está rodando.');
      console.error('   - Windows: Abra "Services" e inicie "PostgreSQL"');
      console.error('   - Docker: Execute "npm run docker:up"\n');
    } else if (error.code === 'ENOENT') {
      console.error('\n💡 Solução: O arquivo exam_schema.sql não foi encontrado.');
      console.error('   Verifique se existe: database/exam_schema.sql\n');
    } else if (error.message.includes('password authentication failed')) {
      console.error('\n💡 Solução: Senha do PostgreSQL incorreta.');
      console.error('   Verifique a variável PGPASSWORD no arquivo .env\n');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('\n💡 Solução: O banco de dados não existe.');
      console.error('   Execute: npm run db:init\n');
    } else {
      console.error('\n💡 Erro SQL:', error.message);
    }

    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar
setupExamTables();
