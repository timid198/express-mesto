/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
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
        if (err.statusCode === ERR_BAD_REQUEST) {
          return err.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return err.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return err.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  getAllUsers(req, res) {
    User.find({})
      .then((users) => res.send({ users }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return err.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return err.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return err.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  getUserById(req, res) {
    User.findById(req.user.userId)
      .then((user) => res.send({ user }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return err.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return err.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return err.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  updateUserProfile(req, res) {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about })
      .then((user) => res.send({ user }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return err.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return err.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return err.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  updateUserAvatar(req, res) {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar })
      .then((user) => res.send({ user }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return err.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return err.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return err.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },
};
