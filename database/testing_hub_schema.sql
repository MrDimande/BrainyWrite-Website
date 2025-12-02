-- Testing Hub Database Schema
-- Run this script to create tables for the exam/testing system

-- Users table (students)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(50) DEFAULT 'student', -- student, teacher, admin
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    passing_score INTEGER NOT NULL DEFAULT 60,
    total_questions INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT false,
    created_by INTEGER REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    question_order INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    image_url VARCHAR(500),
    image_alt VARCHAR(255),
    image_caption VARCHAR(255),
    explanation TEXT,
    points INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Question options table
CREATE TABLE IF NOT EXISTS question_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_letter CHAR(1) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam attempts table
CREATE TABLE IF NOT EXISTS exam_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    time_spent_seconds INTEGER,
    score_percentage DECIMAL(5,2),
    correct_count INTEGER,
    total_questions INTEGER,
    passed BOOLEAN,
    status VARCHAR(50) DEFAULT 'in_progress', -- in_progress, completed, abandoned
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User answers table
CREATE TABLE IF NOT EXISTS user_answers (
    id SERIAL PRIMARY KEY,
    attempt_id INTEGER REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    selected_option CHAR(1),
    is_correct BOOLEAN,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress by subject
CREATE TABLE IF NOT EXISTS user_subject_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    total_exams_taken INTEGER DEFAULT 0,
    total_questions_answered INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    average_score DECIMAL(5,2) DEFAULT 0,
    highest_score DECIMAL(5,2) DEFAULT 0,
    last_exam_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subject_id)
);

-- Achievements/Badges table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    attempt_id INTEGER REFERENCES exam_attempts(id) ON DELETE CASCADE,
    certificate_code VARCHAR(50) UNIQUE NOT NULL,
    score_percentage DECIMAL(5,2) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_url VARCHAR(500),
    emailed_at TIMESTAMP
);

-- Insert default subjects
INSERT INTO subjects (name, slug, description, icon, color) VALUES
    ('Matemática', 'matematica', 'Álgebra, Geometria, Cálculo', 'calculator', 'blue'),
    ('Português', 'portugues', 'Gramática, Literatura, Redação', 'book-open', 'yellow'),
    ('Geografia', 'geografia', 'Geografia física e humana', 'globe', 'green'),
    ('Física', 'fisica', 'Mecânica, Termodinâmica, Óptica', 'atom', 'purple'),
    ('Química', 'quimica', 'Química orgânica e inorgânica', 'flask', 'pink'),
    ('Biologia', 'biologia', 'Citologia, Genética, Ecologia', 'leaf', 'emerald'),
    ('História', 'historia', 'História de Moçambique e Mundial', 'landmark', 'orange')
ON CONFLICT (slug) DO NOTHING;

-- Insert default achievements
INSERT INTO achievements (code, name, description, icon, points) VALUES
    ('first_exam', 'Primeiros Passos', 'Completou o primeiro exame', '🎯', 10),
    ('perfect_score', 'Pontuação Perfeita', 'Obteve 100% num exame', '🌟', 50),
    ('persistent', 'Estudante Persistente', 'Completou 10 exames', '📚', 25),
    ('master', 'Mestre da Disciplina', 'Média ≥90% numa disciplina', '👑', 100),
    ('all_subjects', 'Polivalente', 'Fez exames em todas as disciplinas', '🎓', 75),
    ('dedicated', 'Dedicado', 'Completou 25 exames', '💪', 50),
    ('speed_demon', 'Veloz', 'Completou um exame em menos de 50% do tempo', '⚡', 30),
    ('streak_3', 'Em Série', '3 exames seguidos com aprovação', '🔥', 40)
ON CONFLICT (code) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_exams_subject ON exams(subject_id);
CREATE INDEX IF NOT EXISTS idx_exams_difficulty ON exams(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON exam_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_exam ON exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_attempts_status ON exam_attempts(status);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_subject_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON user_subject_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View for leaderboard
CREATE OR REPLACE VIEW leaderboard AS
SELECT
    u.id,
    u.username,
    u.full_name,
    u.avatar_url,
    COUNT(DISTINCT ea.id) as total_exams,
    COALESCE(AVG(ea.score_percentage), 0) as average_score,
    COALESCE(MAX(ea.score_percentage), 0) as best_score,
    COUNT(DISTINCT CASE WHEN ea.passed THEN ea.id END) as exams_passed,
    COALESCE(SUM(ua.points), 0) as total_points
FROM users u
LEFT JOIN exam_attempts ea ON u.id = ea.user_id AND ea.status = 'completed'
LEFT JOIN user_achievements uach ON u.id = uach.user_id
LEFT JOIN achievements ua ON uach.achievement_id = ua.id
WHERE u.is_active = true
GROUP BY u.id, u.username, u.full_name, u.avatar_url
ORDER BY total_points DESC, average_score DESC;
