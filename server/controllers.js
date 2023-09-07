// controllers.js
const models = require('./models');

exports.getQuestions = async (req, res) => {
  try {
    const { product_id, page = 1, count = 5 } = req.query;
    const questions = await models.fetchQuestions(product_id, page, count);
    res.json(questions);
  } catch (err) {
    res.status(500).send('Error retrieving questions.');
  }
};

exports.getAnswers = async (req, res) => {
  try {
    const { page = 1, count = 5 } = req.query;
    const answers = await models.fetchAnswers(req.params.question_id, page, count);
    res.json(answers);
  } catch (err) {
    res.status(500).send('Error retrieving answers.');
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const {
      body, name, email, product_id,
    } = req.body;
    const question = await models.addQuestion(body, name, email, product_id);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).send('Cannot add question.');
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const {
      body, name, email,
    } = req.body;
    const { question_id } = req.params;
    const answer = await models.addAnswer(body, name, email, question_id);

    res.status(201).json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Cannot add answer.');
  }
};

exports.markQuestionHelpful = async (req, res) => {
  try {
    const { question_id } = req.params;
    const updateHelpfulness = await models.markQuestionHelpful(question_id);

    res.status(201).json(updateHelpfulness);
  } catch (err) {
    res.status(500).send('Cannot mark helpful.');
  }
};

exports.reportQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const reported = await models.reportQuestion(question_id);

    res.status(201).json(reported);
  } catch (err) {
    res.status(500).send('Cannot mark helpful.');
  }
};

exports.markAnswerHelpful = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const updateHelpfulness = await models.markAnswerHelpful(answer_id);

    res.status(201).json(updateHelpfulness);
  } catch (err) {
    console.error(err);
    res.status(500).send('Cannot mark helpful.');
  }
};

exports.reportAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const reported = await models.reportAnswer(answer_id);

    res.status(201).json(reported);
  } catch (err) {
    res.status(500).send('Cannot mark helpful.');
  }
};
