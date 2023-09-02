// models.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'qa',
  port: 5432,
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

exports.addQuestion = async (body, name, email, product_id) => {
  const query = `
        INSERT INTO questions (body, name, email, product_id, date_written)
        VALUES ($1, $2, $3, $4, EXTRACT(EPOCH FROM NOW())::BIGINT)
        RETURNING question_id`;
  const values = [body, name, email, product_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
