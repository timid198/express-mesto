const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getAllCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
      'string.length': 'Не соответствует _id. Количество символов должно равняться: 24.',
    }),
  }, { abortEarly: false }).unknown(true),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'string.empty': 'Поле "name" должно быть заполнено',
    }),
    link: Joi.string().required()
    .pattern(/^(https|http):\/\/(www\.)?[A-Za-z0-9-]+\.[A-Za-z0-9]{2}[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+/)
    .messages({
      'string.pattern.base': 'Поле "link" должно быть ссылкой.',
    }),
  }, { abortEarly: false }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
      'string.length': 'Не соответствует _id. Количество символов должно равняться: 24.',
    }),
  }, { abortEarly: false }).unknown(true),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
      'string.length': 'Не соответствует _id. Количество символов должно равняться: 24.',
    }),
  }, { abortEarly: false }).unknown(true),
}), dislikeCard);

module.exports = router;
