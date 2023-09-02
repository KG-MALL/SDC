// index.js
const express = require('express');
const controllers = require('./controllers');

const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/qa/questions', controllers.getQuestions);
app.get('/qa/questions/:question_id/answers', controllers.getAnswers);

// // Add a Question
// app.post('/qa/questions', controllers.addQuestion);

// // Add an Answer
// app.post('/qa/questions/:question_id/answers', controllers.addAnswer);

// // Mark Question as Helpful
// app.put('/qa/questions/:question_id/helpful', controllers.markQuestionHelpful);

// // Report Question
// app.put('/qa/questions/:question_id/report', controllers.reportQuestion);

// // Mark Answer as Helpful
// app.put('/qa/answers/:answer_id/helpful', controllers.markAnswerHelpful);

// // Report Answer
// app.put('/qa/answers/:answer_id/report', controllers.reportAnswer);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
