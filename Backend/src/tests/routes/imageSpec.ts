import request from 'supertest';
import app from '../../app';

describe('test endpoint GET /api/image', () => {
  it('invalid call', function (done) {
    request(app)
      .get('/api/image')
      .expect((response) => {
        response.text =
          'Enter a valid file name, check assets folder for available names';
      })
      .expect(400)
      .end(done);
  });

  it('success call for file', function (done) {
    request(app).get('/api/image?filename=fish.jpg').expect(200).end(done);
  });

  it('returns an image file', function (done) {
    request(app)
      .get('/api/image?filename=fish.jpg&width=100&height=200')
      .expect(200)
      .end(done);
  });

  describe('test endpoint GET /api/getAllImages', () => {
    it('returns all image files', function (done) {
      request(app).get('/api/getAllImages').expect(200).end(done);
    });
  });

  describe('test endpoint POST /api/upload', () => {
    it('returns all image files', function (done) {
      request(app).post('/api/upload').expect(200).end(done);
    });
  });
});
