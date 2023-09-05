// index.js
const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

// get qa
app.get('/qa/questions', controllers.getQuestions);
app.get('/qa/questions/:question_id/answers', controllers.getAnswers);

// add qa
app.post('/qa/questions', controllers.addQuestion);
app.post('/qa/questions/:question_id/answers', controllers.addAnswer);

// helpful and report for questions
app.put('/qa/questions/:question_id/helpful', controllers.markQuestionHelpful);
app.put('/qa/questions/:question_id/report', controllers.reportQuestion);

// helpful and report for answers
app.put('/qa/answers/:answer_id/helpful', controllers.markAnswerHelpful);
app.put('/qa/answers/:answer_id/report', controllers.reportAnswer);

if (process.env.NODE_ENV !== 'test') {
  const PORT = 4080;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
module.exports = app;
