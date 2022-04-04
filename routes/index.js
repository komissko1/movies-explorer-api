const router = require('express').Router();

const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { createUser } = require('../controllers/createUser');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateUser } = require('../middlewares/validation');

router.post('/signin', validateUser({ name: false, email: true, password: true }), login);
router.post('/signup', validateUser({ name: true, email: true, password: true }), createUser);

router.use(auth);
router.post('/signout', logout);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/', (req, res, next) => { next(); });

router.use((req, res, next) => {
  next(new NotFoundError('Ошибочный путь'));
});
// app.use(errorLogger);
// app.use(errors());
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = statusCode === 500 ? 'Ошибка на стороне сервера' : err.message;
//   res.status(statusCode).send({ message });
//   next();
// });

module.exports = router;
