import mongoose from 'mongoose';
import Book from '../models/book';

const getBooks = (req, res) => {
  Book.find({}).exec((err, books) => {
    if (err) res.send(err);

    res.json(books);
  });
};

const postBook = (req, res) => {
  new Book(req.body).save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Book successfully added!', book });
    }
  });
};

const getBook = (req, res) => {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) res.send(err);

    res.json(book);
  });
};

const deleteBook = (req, res) => {
  Book.remove({ _id: req.params.id }, (err, result) => {
    if (err) res.send(err);

    res.json({ message: 'Book successfully deleted', result });
  });
};

const updateBook = (req, res) => {
  Book.findById({ _id: req.params.id }, (err, book) => {
    if (err) res.send(err);

    Object.assign(book, req.body).save((err, book) => {
      if (err) res.send(err);

      res.json({ message: 'Book successfully updated', book });
    });
  });
};

export { getBooks, postBook, getBook, deleteBook, updateBook };
