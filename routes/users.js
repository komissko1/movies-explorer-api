const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(/[\wа-я\sё]/i).min(2).max(30)
      .required(),
    email: Joi.string().email().required(),
  }),
}), updateProfile);

module.exports = router;
