const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /[\wа-я\sё]/gi;
        return regex.test(v);
      },
      message: 'Значение должно состоять из символов',
    },
    default: 'John Doe',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Значение не соответствует адресу электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        const regex = /[\w!@#&()$"{%}:;',?*~$^+=<>]/gi;
        return regex.test(v);
      },
      message: 'Значение должно состоять из латинских символов и цифр',
    },
  },
});

userSchema.statics.findUserByLoginData = function ({ email, password }) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new AuthorizationError('Пользователь не найден'));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError('Пользователь не авторизован'));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
