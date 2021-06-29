const Card = require('../models/cards');
const BadRequestError = require('../errors/bad-request-err');
const AuthorizedButForbiddenError = require('../errors/authorized-but-forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');

module.exports = {
  createCard(req, res, next) {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => {
        res.send({ data: card });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        if (err.statusCode === 400) {
          throw new BadRequestError('Переданы некорректные данные в метод создания карточки.');
        }
        throw new InternalServerError('На сервере произошла ошибка.');
      })
      .catch(next);
  },

  getAllCards(req, res, next) {
    Card.find({})
      .populate(['owner', 'likes'])
      .then((cards) => res.send({ cards }))
      .catch(() => {
        throw new InternalServerError('На сервере произошла ошибка.');
      })
      .catch(next);
  },

  deleteCardById(req, res, next) {
    Card.findById(req.params.cardId)
      .then((card) => {
        if (`${req.user._id}` === `${card.owner._id}`) {
          return card;
        }
        throw new AuthorizedButForbiddenError('Вы пытаетесь изменить не свои данные.');
      })
      .then((card) => {
        Card.findByIdAndRemove(card._id, next)
          .then((data) => {
            if (!data) {
              throw new NotFoundError('Карточка не найдена.');
            }
            res.send({ data });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError('Переданы некорректные данные.');
            }
            throw new InternalServerError('На сервере произошла ошибка.');
          })
          .catch(next);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
        throw new InternalServerError('На сервере произошла ошибка.');
      })
      .catch(next);
  },

  likeCard(req, res, next) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка не найдена.');
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
        throw new InternalServerError('На сервере произошла ошибка.');
      })
      .catch(next);
  },

  dislikeCard(req, res, next) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Карточка не найдена.');
        }
        res.send({ card });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные.');
        }
        throw new InternalServerError('На сервере произошла ошибка.');
      })
      .catch(next);
  },
};
