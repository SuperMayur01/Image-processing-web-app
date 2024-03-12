import request from 'supertest';
import app from '../app';

describe('test endpoint GET /api', () => {
  it('responds with not found', function (done) {
    request(app)
      .get('/api')
      .expect((response) => (response.text = 'Enter file name to convert'))
      .expect(404)
      .end(done);
  });
});
