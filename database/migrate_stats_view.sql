-- Migration to update user_overall_stats view with new columns
-- This adds total_questions_answered and total_correct_answers

DROP VIEW IF EXISTS user_overall_stats;

CREATE VIEW user_overall_stats AS
SELECT
    u.id AS user_id,
    COUNT(ea.id) AS total_exams_taken,
    SUM(ea.total_questions) AS total_questions_answered,
    SUM(ea.correct_count) AS total_correct_answers,
    COALESCE(AVG(ea.score_percentage), 0) AS average_score,
    COALESCE(SUM(ea.time_spent), 0) AS total_time_spent,
    COUNT(DISTINCT ea.subject) AS subjects_attempted
FROM users u
LEFT JOIN exam_attempts ea ON u.id = ea.user_id
GROUP BY u.id;
