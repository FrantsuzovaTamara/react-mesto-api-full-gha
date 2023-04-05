const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const router = require('./index');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

const corsOptions = {
  origin: [
    'https://mesto.by.frantsuzova.t.p.nomoredomains.work',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use(helmet());
app.use('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(PORT);
});
