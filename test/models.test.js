const { fetchQuestions, fetchAnswers } = require('../server/models');

describe('Model functions', () => {
  test('fetchQuestions should return the correct question', async () => {
    const data = await fetchQuestions(40350, 1, 5);
    const questionId = data.results[0].question_id;
    expect(typeof data).toBe('object');
    expect(questionId).toBe(141990);
  });

  test('fetchAnswers should return the correct answer', async () => {
    const data = await fetchAnswers(1, 1, 5);
    const answerId = data.results[0].answer_id;
    expect(typeof data).toBe('object');
    expect(answerId).toBe(5);
  });
});
