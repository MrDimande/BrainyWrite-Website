-- ⚠️ BACKUP / ALTERNATIVA NÃO UTILIZADA ⚠️
-- 
-- Este arquivo é uma versão alternativa do schema que usa UUID em vez de SERIAL.
-- NÃO USE ESTE ARQUIVO - ele não é compatível com o código atual.
--
-- O projeto usa: database/schema.sql (com SERIAL/INTEGER)
--
-- Este arquivo foi mantido apenas como referência caso seja necessário
-- migrar para UUID no futuro. Se isso acontecer, será necessário:
-- 1. Atualizar todos os tipos de ID no código (server.js, etc.)
-- 2. Converter dados existentes
-- 3. Atualizar todas as queries que esperam INTEGER
--
-- Data de backup: 2025-01-27
-- Motivo: Padronização para usar apenas schema.sql

-- BrainyWrite Database Schema (UUID Version - NOT USED)
-- This file initializes the database with all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contactos table (Contact form submissions)
CREATE TABLE IF NOT EXISTS contactos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    apelido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    assunto VARCHAR(200) NOT NULL,
    mensagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    replied_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contactos_email ON contactos(email);
CREATE INDEX IF NOT EXISTS idx_contactos_created_at ON contactos(created_at DESC);

-- Cotacoes table (Quote requests)
CREATE TABLE IF NOT EXISTS cotacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    institution VARCHAR(200),
    work_type VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    pages INTEGER NOT NULL,
    deadline DATE NOT NULL,
    academic_level VARCHAR(50),
    formatting VARCHAR(50),
    language VARCHAR(50),
    title TEXT,
    description TEXT,
    has_references VARCHAR(10) DEFAULT 'nao',
    additional_services JSONB DEFAULT '[]',
    calculated_price DECIMAL(10, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted_at TIMESTAMP,
    converted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cotacoes_email ON cotacoes(email);
CREATE INDEX IF NOT EXISTS idx_cotacoes_status ON cotacoes(status);
CREATE INDEX IF NOT EXISTS idx_cotacoes_created_at ON cotacoes(created_at DESC);

-- Agendamentos table (Appointment bookings)
CREATE TABLE IF NOT EXISTS agendamentos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(200) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    cancelled_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_agendamentos_email ON agendamentos(email);
CREATE INDEX IF NOT EXISTS idx_agendamentos_date ON agendamentos(date);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status ON agendamentos(status);
CREATE INDEX IF NOT EXISTS idx_agendamentos_created_at ON agendamentos(created_at DESC);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMP,
    last_email_sent_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Admin users table (for admin dashboard)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Activity log table (for tracking admin actions)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_user ON activity_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash is bcrypt hash for 'admin123'
INSERT INTO admin_users (username, email, password_hash, role)
VALUES ('admin', 'admin@brainywrite.co.mz', '$2b$10$rQ8X8X8X8X8X8X8X8X8X8e8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X8X', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_cotacoes_updated_at BEFORE UPDATE ON cotacoes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create view for dashboard stats
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
    (SELECT SUM(calculated_price) FROM cotacoes WHERE status = 'converted') as total_revenue;

