require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');

const createNote = note => {
  return request(app)
    .post('/api/v1/notes')
    .send(note)
    .then(res => res.body);
};

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

  it('can fetch notes via GET', async() => {
    const notes = await Promise.all([
      createNote({ title: 'Hello', body: 'World' }),
      createNote({ title: 'Goodbye', body: 'Banana' }),
      createNote({ title: 'UpsideDown', body: 'Smiles' })
    ]);

    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toEqual(notes);
      });
  });

});
