const { celebrate, Joi } = require('celebrate');

const linkPattern = /^(https?:\/\/)(www\.)?([\da-z-]+)\.([\da-z]{2,3})([\S]+)?/mi;

module.exports.validateUser = ({ name, email, password }) => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(name),
    email: Joi.string().email().required(email),
    password: Joi.string()
      .pattern(/[\w!@#&()$'{%}:;',?*~$^+=<>]/i)
      .required(password),
  }),
});

module.exports.validateCardCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(linkPattern).required(),
    trailerLink: Joi.string().pattern(linkPattern).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(linkPattern).required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateCardDelete = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
