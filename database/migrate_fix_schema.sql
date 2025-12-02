-- Migration to fix exam_attempts schema and update stats view

-- 1. Alter exam_attempts table
-- Drop foreign key constraint if it exists (to allow changing exam_id type)
ALTER TABLE exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_exam_id_fkey;

-- Change exam_id to VARCHAR to support IDs like 'mat-001'
ALTER TABLE exam_attempts ALTER COLUMN exam_id TYPE VARCHAR(50);

-- Add missing columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_attempts' AND column_name = 'subject') THEN
        ALTER TABLE exam_attempts ADD COLUMN subject VARCHAR(100);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_attempts' AND column_name = 'exam_title') THEN
        ALTER TABLE exam_attempts ADD COLUMN exam_title VARCHAR(255);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_attempts' AND column_name = 'difficulty') THEN
        ALTER TABLE exam_attempts ADD COLUMN difficulty VARCHAR(20);
    END IF;
END $$;

-- Rename time_spent_seconds to time_spent if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exam_attempts' AND column_name = 'time_spent_seconds') THEN
        ALTER TABLE exam_attempts RENAME COLUMN time_spent_seconds TO time_spent;
    END IF;
END $$;

-- 2. Update user_overall_stats view
DROP VIEW IF EXISTS user_overall_stats;

CREATE VIEW user_overall_stats AS
SELECT
    u.id AS user_id,
    COUNT(ea.id) AS total_exams_taken,
    COALESCE(SUM(ea.total_questions), 0) AS total_questions_answered,
    COALESCE(SUM(ea.correct_count), 0) AS total_correct_answers,
    COALESCE(AVG(ea.score_percentage), 0) AS average_score,
    COALESCE(SUM(ea.time_spent), 0) AS total_time_spent,
    COUNT(DISTINCT ea.subject) AS subjects_attempted
FROM users u
LEFT JOIN exam_attempts ea ON u.id = ea.user_id
GROUP BY u.id;
