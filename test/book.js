process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Book from '../app/models/book';

const should = chai.should();
chai.use(chaiHttp);

describe('Book', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    })
  });

  describe('/GET book', () => {
    it('it should get all books', () => {
      chai.request(server)
        .get('/book')
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
