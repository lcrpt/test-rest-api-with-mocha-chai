process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
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
    it('it should get all books', (done) => {
      chai.request(server)
      .get('/book')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  describe('/POST book', () => {
    it('it should not POST a book without pages fields', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'J.R.R Tolkien',
        year: 1954,
      });

      chai.request(server)
      .post('/book')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('pages');
        res.body.errors.pages.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a book', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'J.R.R Tolkien',
        year: 1954,
        pages: 1170,
      });

      chai.request(server)
      .post('/book')
      .send(book)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Book successfully added!');
        res.body.book.should.have.property('title');
        res.body.book.should.have.property('author');
        res.body.book.should.have.property('year');
        res.body.book.should.have.property('pages');
        done();
      });
    });
  });

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      const book = new Book({
        title: 'The lord of the rings',
        author: 'J.R.R Tolkien',
        year: 1954,
        pages: 1170,
      });

      book.save((err, book) => {
        chai.request(server)
        .get(`/book/${book.id}`)
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('year');
          res.body.should.have.property('pages');
          res.body.should.have.property('_id').eql(book.id);
          done();
        });
      });
    });
  });
});

















//
