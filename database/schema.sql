-- BrainyWrite Database Schema
-- Run this script to create all necessary tables

-- Enable UUID extension (if using UUIDs)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contacts table
CREATE TABLE IF NOT EXISTS contactos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    apelido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    assunto VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes table
CREATE TABLE IF NOT EXISTS cotacoes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    institution VARCHAR(255),
    work_type VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    pages INTEGER NOT NULL,
    deadline DATE NOT NULL,
    academic_level VARCHAR(255),
    formatting VARCHAR(255),
    language VARCHAR(50),
    title VARCHAR(500),
    description TEXT,
    has_references VARCHAR(10),
    additional_services JSONB,
    calculated_price DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    contacted_at TIMESTAMP,
    converted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create view for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM contactos) as total_contacts,
    (SELECT COUNT(*) FROM contactos WHERE read_at IS NULL) as unread_contacts,
    (SELECT COUNT(*) FROM cotacoes) as total_quotes,
    (SELECT COUNT(*) FROM cotacoes WHERE status = 'pending') as pending_quotes,
    (SELECT COUNT(*) FROM cotacoes WHERE status = 'converted') as converted_quotes,
    (SELECT COUNT(*) FROM agendamentos) as total_appointments,
    (SELECT COUNT(*) FROM agendamentos WHERE status = 'pending') as pending_appointments,
    (SELECT COUNT(*) FROM agendamentos WHERE status = 'confirmed') as confirmed_appointments,
    (SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = true) as active_subscribers,
    (SELECT COALESCE(SUM(calculated_price), 0) FROM cotacoes WHERE status = 'converted') as total_revenue;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contactos_email ON contactos(email);
CREATE INDEX IF NOT EXISTS idx_contactos_created_at ON contactos(created_at);

CREATE INDEX IF NOT EXISTS idx_cotacoes_email ON cotacoes(email);
CREATE INDEX IF NOT EXISTS idx_cotacoes_status ON cotacoes(status);
CREATE INDEX IF NOT EXISTS idx_cotacoes_created_at ON cotacoes(created_at);

CREATE INDEX IF NOT EXISTS idx_agendamentos_email ON agendamentos(email);
CREATE INDEX IF NOT EXISTS idx_agendamentos_date ON agendamentos(date);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON agendamentos(status);
CREATE INDEX IF NOT EXISTS idx_agendamentos_created_at ON agendamentos(created_at);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_is_active ON newsletter_subscribers(is_active);

CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contactos_updated_at BEFORE UPDATE ON contactos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cotacoes_updated_at BEFORE UPDATE ON cotacoes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agendamentos_updated_at BEFORE UPDATE ON agendamentos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- IMPORTANT: Do not insert admin users here!
-- Use the create-admin script instead:
--   npm run create-admin
-- Or with custom credentials:
--   npm run create-admin username email@example.com password
--
-- This ensures proper password hashing with bcrypt.

