-- BrainyWrite - Script SQL Combinado
-- Execute este arquivo no pgAdmin ou outro cliente SQL

-- ============================================
-- PARTE 1: Schema Principal (se ainda não executou)
-- ============================================

-- Enable UUID extension (if using UUIDs)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para atualizar updated_at (NECESSÁRIA para exam_schema)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- PARTE 2: Tabelas do Sistema de Exames (NOVO)
-- ============================================

-- Users table for exam system (separate from admin_users)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    institution VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam attempts table (stores each exam completion)
CREATE TABLE IF NOT EXISTS exam_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exam_id VARCHAR(50) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    exam_title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    score_percentage DECIMAL(5,2) NOT NULL,
    correct_count INTEGER NOT NULL,
    incorrect_count INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    time_spent INTEGER NOT NULL,
    user_answers JSONB NOT NULL,
    passed BOOLEAN NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subject progress (aggregated stats per subject)
CREATE TABLE IF NOT EXISTS user_subject_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    total_attempts INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    total_questions_attempted INTEGER DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    best_score DECIMAL(5,2) DEFAULT 0,
    exams_passed INTEGER DEFAULT 0,
    exams_failed INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subject)
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exam_attempt_id INTEGER REFERENCES exam_attempts(id) ON DELETE CASCADE,
    exam_id VARCHAR(50) NOT NULL,
    exam_title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    certificate_code VARCHAR(100) UNIQUE NOT NULL,
    score_percentage DECIMAL(5,2) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_url VARCHAR(500),
    email_sent BOOLEAN DEFAULT false,
    email_sent_at TIMESTAMP
);

-- Saved exam states (for resuming exams)
CREATE TABLE IF NOT EXISTS exam_states (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exam_id VARCHAR(50) NOT NULL,
    current_question INTEGER DEFAULT 0,
    user_answers JSONB,
    time_remaining INTEGER NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, exam_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);

CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_id ON exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_id ON exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_subject ON exam_attempts(subject);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_completed_at ON exam_attempts(completed_at);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_subject ON exam_attempts(user_id, subject);

CREATE INDEX IF NOT EXISTS idx_user_subject_progress_user_id ON user_subject_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subject_progress_subject ON user_subject_progress(subject);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_exam_id ON certificates(exam_id);

CREATE INDEX IF NOT EXISTS idx_exam_states_user_id ON exam_states(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_states_exam_id ON exam_states(exam_id);

-- ============================================
-- TRIGGERS AUTOMÁTICOS
-- ============================================

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subject_progress_updated_at BEFORE UPDATE ON user_subject_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exam_states_updated_at BEFORE UPDATE ON exam_states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGER PARA ATUALIZAR PROGRESSO AUTOMATICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION update_subject_progress()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_subject_progress (
        user_id,
        subject,
        total_attempts,
        total_correct_answers,
        total_questions_attempted,
        average_score,
        best_score,
        exams_passed,
        exams_failed,
        last_attempt_at
    ) VALUES (
        NEW.user_id,
        NEW.subject,
        1,
        NEW.correct_count,
        NEW.total_questions,
        NEW.score_percentage,
        NEW.score_percentage,
        CASE WHEN NEW.passed THEN 1 ELSE 0 END,
        CASE WHEN NOT NEW.passed THEN 1 ELSE 0 END,
        NEW.completed_at
    )
    ON CONFLICT (user_id, subject)
    DO UPDATE SET
        total_attempts = user_subject_progress.total_attempts + 1,
        total_correct_answers = user_subject_progress.total_correct_answers + NEW.correct_count,
        total_questions_attempted = user_subject_progress.total_questions_attempted + NEW.total_questions,
        average_score = (user_subject_progress.average_score * user_subject_progress.total_attempts + NEW.score_percentage) / (user_subject_progress.total_attempts + 1),
        best_score = GREATEST(user_subject_progress.best_score, NEW.score_percentage),
        exams_passed = user_subject_progress.exams_passed + CASE WHEN NEW.passed THEN 1 ELSE 0 END,
        exams_failed = user_subject_progress.exams_failed + CASE WHEN NOT NEW.passed THEN 1 ELSE 0 END,
        last_attempt_at = NEW.completed_at,
        updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_subject_progress
    AFTER INSERT ON exam_attempts
    FOR EACH ROW
    EXECUTE FUNCTION update_subject_progress();

-- ============================================
-- VIEWS PARA ESTATÍSTICAS
-- ============================================

CREATE OR REPLACE VIEW user_overall_stats AS
SELECT
    u.id as user_id,
    u.name,
    u.email,
    COUNT(DISTINCT ea.id) as total_exams_taken,
    COUNT(DISTINCT CASE WHEN ea.passed THEN ea.id END) as total_exams_passed,
    COUNT(DISTINCT ea.subject) as subjects_attempted,
    AVG(ea.score_percentage) as average_score,
    MAX(ea.score_percentage) as best_score,
    SUM(ea.total_questions) as total_questions_answered,
    SUM(ea.correct_count) as total_correct_answers,
    SUM(ea.time_spent) as total_time_spent,
    COUNT(DISTINCT c.id) as certificates_earned,
    MAX(ea.completed_at) as last_exam_at
FROM users u
LEFT JOIN exam_attempts ea ON u.id = ea.user_id
LEFT JOIN certificates c ON u.id = c.user_id
GROUP BY u.id, u.name, u.email;

CREATE OR REPLACE VIEW exam_statistics AS
SELECT
    exam_id,
    subject,
    exam_title,
    difficulty,
    COUNT(*) as total_attempts,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(score_percentage) as average_score,
    COUNT(CASE WHEN passed THEN 1 END) as total_passed,
    COUNT(CASE WHEN NOT passed THEN 1 END) as total_failed,
    (COUNT(CASE WHEN passed THEN 1 END)::DECIMAL / COUNT(*)::DECIMAL * 100) as pass_rate,
    AVG(time_spent) as average_time_spent,
    MAX(completed_at) as last_attempt_at
FROM exam_attempts
GROUP BY exam_id, subject, exam_title, difficulty;

-- ============================================
-- VERIFICAÇÃO FINAL
-- ============================================

-- Mostrar tabelas criadas
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'exam_attempts', 'user_subject_progress', 'certificates', 'exam_states')
ORDER BY table_name;
