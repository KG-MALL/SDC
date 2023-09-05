const request = require('supertest');
const app = require('../server/index');

let server;

beforeAll(() => {
  const PORT = 4080;
  server = app.listen(PORT);
});

afterAll((done) => {
  server.close(done);
});

describe('API Endpoints', () => {
  test('GET /qa/questions should respond with status 200', async () => {
    const response = await request(app).get('/qa/questions?product_id=1');
    expect(response.statusCode).toBe(200);
  });

  test('GET /qa/questions/:question_id/answers should respond with status 200', async () => {
    const response = await request(app).get('/qa/questions/1/answers');
    expect(response.statusCode).toBe(200);
  });

  test('POST /qa/questions should respond with status 201', async () => {
    const newQuestion = {
      body: 'Test question',
      name: 'John',
      email: 'john@example.com',
      product_id: 1,
    };
    const response = await request(app).post('/qa/questions').send(newQuestion);
    expect(response.statusCode).toBe(201);
  });

  test('POST /qa/questions/:question_id/answers should respond with status 201', async () => {
    const newAnswer = {
      body: 'Test answer',
      name: 'John',
      email: 'john@example.com',
      photos: [],
    };
    const response = await request(app).post('/qa/questions/1/answers').send(newAnswer);
    expect(response.statusCode).toBe(201);
  });

  test('PUT /qa/questions/:question_id/helpful should respond with status 201', async () => {
    const response = await request(app).put('/qa/questions/1/helpful');
    expect(response.statusCode).toBe(201);
  });

  test('PUT /qa/questions/:question_id/report should respond with status 201', async () => {
    const response = await request(app).put('/qa/questions/1/report');
    expect(response.statusCode).toBe(201);
  });

  test('PUT /qa/answers/:answer_id/helpful should respond with status 201', async () => {
    const response = await request(app).put('/qa/answers/1/helpful');
    expect(response.statusCode).toBe(201);
  });

  test('PUT /qa/answers/:answer_id/report should respond with status 201', async () => {
    const response = await request(app).put('/qa/answers/1/report');
    expect(response.statusCode).toBe(201);
  });
});
