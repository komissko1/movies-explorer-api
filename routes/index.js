const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { createUser } = require('../controllers/createUser');
const { auth } = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/[\w!@#&()$"{%}:;',?*~$^+=<>]/i).required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/[\w!@#&()$"{%}:;',?*~$^+=<>]/i).required(),
  }),
}), createUser);
router.post('/signout', auth, logout);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

module.exports = router;
