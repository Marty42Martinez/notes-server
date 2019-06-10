require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('notes routes', () => {
  it('can create a note via POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'first note', body: 'never forget' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'first note',
          body: 'never forget',
          __v: 0
        });
      });
  });
});
