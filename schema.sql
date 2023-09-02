-- Drop tables if they exist
DROP TABLE IF EXISTS answer_photos CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    date_written BIGINT NOT NULL,
    asker_name VARCHAR(255) NOT NULL,
    asker_email VARCHAR(255) NOT NULL,
    reported BOOLEAN DEFAULT FALSE,
    helpfulness INTEGER DEFAULT 0
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(question_id),
    body TEXT NOT NULL,
    date_written BIGINT NOT NULL,
    answerer_name VARCHAR(255) NOT NULL,
    answerer_email VARCHAR(255) NOT NULL,
    reported BOOLEAN DEFAULT FALSE,
    helpfulness INTEGER DEFAULT 0
);

CREATE TABLE answer_photos (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER NOT NULL REFERENCES answers(answer_id),
    url TEXT NOT NULL
);

CREATE INDEX idx_questions_product_id ON questions (product_id);
CREATE INDEX idx_answers_question_id ON answers (question_id);
