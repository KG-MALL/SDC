require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: '184.72.16.148',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: 'qa',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.fetchQuestions = async (productId, page, count) => {
  const query = `
        SELECT question_id, product_id, body, date_written, asker_name, asker_email, reported, helpfulness
        FROM questions 
        WHERE product_id = $1 AND reported = false 
        LIMIT $2 OFFSET $3`;
  const values = [productId, count, (page - 1) * count];
  const result = await pool.query(query, values);
  return {
    product_id: productId,
    results: result.rows,
  };
};

exports.fetchAnswers = async (questionId, page, count) => {
  const query = `
        SELECT answer_id, question_id, body, date_written, answerer_name, answerer_email, reported, helpfulness
        FROM answers 
        WHERE question_id = $1 AND reported = false 
        LIMIT $2 OFFSET $3`;
  const values = [questionId, count, (page - 1) * count];
  const result = await pool.query(query, values);
  return {
    question: questionId,
    page,
    count,
    results: result.rows,
  };
};
exports.addQuestion = async (body, asker_name, asker_email, product_id) => {
  try {
    const query = `
        INSERT INTO questions (body, asker_name, asker_email, product_id, date_written)
        VALUES ($1, $2, $3, $4, EXTRACT(EPOCH FROM NOW())::BIGINT)
        RETURNING question_id`;
    const values = [body, asker_name, asker_email, product_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error in addQuestion: ', error);
    throw error;
  }
};

exports.addAnswer = async (body, answerer_name, answerer_email, question_id) => {
  const query = `
        INSERT INTO answers (body, answerer_name, answerer_email, question_id, date_written)
        VALUES ($1, $2, $3, $4, EXTRACT(EPOCH FROM NOW())::BIGINT)
        RETURNING answer_id`;

  const values = [body, answerer_name, answerer_email, question_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.markQuestionHelpful = async (question_id) => {
  const query = `
        UPDATE questions
        SET helpfulness = helpfulness +1
        WHERE question_id = $1
        RETURNING helpfulness`;
  const value = [question_id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

exports.reportQuestion = async (question_id) => {
  const query = `
        UPDATE questions
        SET reported = True
        WHERE question_id = $1
        RETURNING reported`;
  const value = [question_id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

exports.markAnswerHelpful = async (answer_id) => {
  const query = `
        UPDATE answers
        SET helpfulness = helpfulness +1
        WHERE answer_id = $1
        RETURNING helpfulness`;
  const value = [answer_id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

exports.reportAnswer = async (answer_id) => {
  const query = `
        UPDATE answers
        SET reported = True
        WHERE answer_id = $1
        RETURNING reported`;
  const value = [answer_id];
  const result = await pool.query(query, value);
  return result.rows[0];
};
