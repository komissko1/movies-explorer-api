const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

const allowedCors = [
  'https://mesto-komisarov.students.nomoredomains.work',
  'http://localhost:3001',
  'https://mesto-komisarov.nomoredomains.work',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  next(new NotFoundError('Ошибочный путь'));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка на стороне сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
