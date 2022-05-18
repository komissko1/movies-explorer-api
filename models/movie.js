const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
    // validate: {
    //   validator(v) {
    //     return validator.isURL(v);
    //   },
    //   message: 'Не является URLом',
    // },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)(www\.)?([\da-z-]+)\.([\da-z]{2,3})([\S]+)?/mi;
        return regex.test(v);
      },
      message: 'Не является URLом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isAlphanumeric(v, 'ru-RU', { ignore: ' -' });
      },
      message: 'Название должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isAlphanumeric(v, 'en-US', { ignore: ' -' });
      },
      message: 'Название должно быть на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
