const request = require('supertest');
const app = require('../src/server/index');

describe('Post Endpoint', () => {
    it('should create a new post', async () => {
    const res = await request(app)
    .post('/addTrip')
    .send({location: "San Francisco", departDate: "2022/01/01"});
    expect(res.body).toHaveProperty('location');
    });
});