const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = jwt.verify(token, 'cohort-22-web-development');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
  return true;
};
