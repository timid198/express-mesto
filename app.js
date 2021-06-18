const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');

// const ERR_NOT_FOUND = 404;
// const ERR_INTERNAL_SERVER_ERROR = 500;

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60c75d379ba3e42008afcc3b',
  };

  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCards);
app.use((req, res, next) => {
  next(createError(404));
});
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    status: error.status,
    message: 'Ресурс не найден.',
  });
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
