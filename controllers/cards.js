const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_INTERNAL_SERVER_ERROR = 500;

const Card = require('../models/cards');

module.exports = {
  createCard(req, res) {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные в метод создания карточки.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  getAllCards(req, res) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((cards) => res.send({ cards }))
      .catch(() => {
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  deleteCardById(req, res) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(ERR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
          return;
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  likeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(ERR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
          return;
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
          return;
        }
        res.status(ERR_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка.' });
      });
  },

  dislikeCard(req, res) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(ERR_NOT_FOUND).send({ message: 'Карточка не найдена.' });
          return;
        }
        res.send({ card });
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
