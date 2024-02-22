import request from 'supertest';
import app from '../../app';

describe('test endpoint GET /api/image', () => {
  it('invalid call', function (done) {
    request(app).get('/api/image')
    .expect((response) => {response.text = 'Enter a valid file name, check assets folder for available names'})
    .expect(400)
    .end(done)
  });

  it('success call for file', function (done) {
    request(app).get('/api/image?filename=fish')
      .expect(200)
      .end(done)
  });

  it('returns an image file', function (done) {
    request(app)
      .get('/api/image?filename=fish&width=100&height=200')
      .expect(200)
      .end(done)
  });
});
