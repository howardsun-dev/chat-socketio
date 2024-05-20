const request = require('supertest');
const app = require('../server.ts');

describe('GET /', () => {
  it('responds with Hello Express + TypeScript Server', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Hello Express + TypeScript Server');
  });
});
