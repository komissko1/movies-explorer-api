const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserExistsError = require('../errors/UserExistsError');
const WrongDataError = require('../errors/WrongDataError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      })
      .catch((err) => {
        console.log(err);
        if (err.name === 'ValidationError') {
          throw new WrongDataError('Переданы некорректные данные');
        }
        if (err.code === 11000) {
          throw new UserExistsError('Пользователь с таким мейлом уже существует');
        }
        return next(err);
      }))
    .catch(next);
};
