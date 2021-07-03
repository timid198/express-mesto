const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {  celebrate, Joi, errors, isCelebrateError, CelebrateError } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const BadRequestError = require('./errors/bad-request-err');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
  }, { abortEarly: false }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }, { abortEarly: false }),
}), login);
app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCards);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден.'));
});
app.use((err, req, res, next) => {
  if (err.code === 'ERR_ASSERTION'){
    return res
              .status(400)
              .send({
                status: 400,
                message: 'Вы ввели некорректные данные.',        
              });
  };
  const { statusCode = 500, message } = err;
  res
     .status(statusCode)
     .send({
       status: statusCode,
       message: statusCode === 500
         ? 'На сервере произошла ошибка.'
         : message,          
     });
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
