const jwt = require('jsonwebtoken');
const AuthorizedButForbiddenError = require('../errors/authorized-but-forbidden-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'cohort-22-web-development');
  } catch (err) {
    throw new AuthorizedButForbiddenError('Необходима авторизация.');
  }

  req.user = payload;

  return next();
};
