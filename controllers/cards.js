/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-unreachable */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_INTERNAL_SERVER_ERROR = 500;

const Card = require('../models/cards');

module.exports = {
  createCard(req, res) {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        console.log(err.name);
        if (err.statusCode === ERR_BAD_REQUEST) {
          return res.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return res.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return res.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  getAllCards(req, res) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((cards) => res.send({ cards }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return res.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return res.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return res.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  deleteCardById(req, res) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send({ card }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return res.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return res.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return res.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  likeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => res.send({ card }))
      .catch((err) => {
        console.log(err.name);
        if (err.statusCode === ERR_BAD_REQUEST) {
          return res.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return res.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return res.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },

  dislikeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => res.send({ card }))
      .catch((err) => {
        if (err.statusCode === ERR_BAD_REQUEST) {
          return res.status(ERR_BAD_REQUEST).send({
            message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля.',
          });
        } if (err.statusCode === ERR_NOT_FOUND) {
          return res.status(ERR_NOT_FOUND).send({
            message: 'Карточка или пользователь не найден.',
          });
        } if (err.statusCode === ERR_INTERNAL_SERVER_ERROR) {
          return res.status(ERR_INTERNAL_SERVER_ERROR).send({
            message: 'На сервере произошла ошибка.',
          });
        }
      });
  },
};
