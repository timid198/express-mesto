const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
// const NotFoundError = require('../errors/not-found-err');

router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }, { abortEarly: false }).unknown(true),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).error(new Error()),
    about: Joi.string().min(2).max(200).error(new Error()),
  }, { abortEarly: false }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(https|http):\/\/(www\.)?[A-Za-z0-9-]+\.[A-Za-z0-9]{2}[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }, { abortEarly: false }),
}), updateUserAvatar);

router.get('/me', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }, { abortEarly: false }).unknown(true),
}), getUserById);

module.exports = router;
