/* eslint-disable no-underscore-dangle */
import User from '../models/user';
import Picture from '../models/picture';

const db = require('../models');

module.exports = {
  findAll(req, res) {
    db
      .User
      .find(req.query)
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getAllImageInfo(req, res) {
    db
      .User
      .findById(req.user._id)
      .populate('pics')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById(req, res) {
    db
      .User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create(req, res) {
    db
      .User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update(req, res) {
    User.findOneAndUpdate({
      _id: req.params.id,
    }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createImageInfo(req, res) {
    db
      .Picture
      .create(req.body)
      .then((dbModel) => {
        if (!dbModel) {
          res.statusMessage = 'Picture document could not be created';
          res.status(404).send(res.statusMessage);
        }
        return User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { pics: dbModel._id } },
          { returnNewDocument: true },
        );
      })
      .then((updatedUser) => {
        if (updatedUser !== undefined) {
          // If the User collection was updated successfully, return true
          return res.json(true);
        }
        return res.status(422).end();
      })
      .catch(err => res.status(422).json(err));
  },
  remove(req, res) {
    db
      .User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register(req, res) {
    // To create a new user
    const { email, password } = req.body;
    User
      .register(new User({ email }), password, (err) => {
        if (err) {
          console.log('error while user register!!', err);
          res.statusMessage = err.message;
          return res.status(422).json(err);
        }
        console.log('user registered successfully.');
        res.json(true);
        return null;
      });
  },
};
