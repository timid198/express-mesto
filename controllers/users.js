const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_INTERNAL_SERVER_ERROR = 500;

const User = require('../models/users');

module.exports = {
  createUser(req, res) {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные в метод создания пользователя.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  getAllUsers(req, res) {
    User.find({})
      .then((users) => res.send({ users }))
      .catch(() => {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  getUserById(req, res) {
    User.findById(req.user.userId)
      .then((user) => {
        if (!user) {
          res.status(ERR_NOT_FOUND).send({ message: 'Пользователь не найден.' });
          return;
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  updateUserProfile(req, res) {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(ERR_NOT_FOUND).send({ message: 'Пользователь не найден.' });
          return;
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  updateUserAvatar(req, res) {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          res.status(ERR_NOT_FOUND).send({ message: 'Пользователь не найден.' });
          return;
        }
        res.send({ user });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },
};
