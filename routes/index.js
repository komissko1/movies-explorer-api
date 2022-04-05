const router = require('express').Router();

const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { createUser } = require('../controllers/createUser');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignup, validateSignin } = require('../middlewares/validation');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use(auth);
router.post('/signout', logout);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/', (req, res, next) => { next(); });

router.use((req, res, next) => {
  next(new NotFoundError('Ошибочный путь'));
});

module.exports = router;
