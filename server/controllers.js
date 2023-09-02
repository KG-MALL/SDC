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

};
exports.markQuestionHelpful = async (req, res) => {

};
exports.reportQuestion = async (req, res) => {

};
exports.markAnswerHelpful = async (req, res) => {

};
exports.reportAnswer = async (req, res) => {

};
