const request = require('supertest');
const server = require('../index');

const query = `{
	title(id: 801){
		Id
		Name
	}
}`;

const data = { data: { title: { Name: 'The Tibetan Dog', Id: '801' } } };

describe('loading express', (done) => {
  it('responds to /graphql', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('responds with a title', (done) => {
    request(server)
      .get('/graphql')
      .query({ query })
      .expect(200, data, done);
  });
  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

server.close();
