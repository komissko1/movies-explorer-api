const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const valueCheck = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Значение поля должно быть ссылкой');
};

const customJoi = Joi.defaults((schema) => schema.options({
  allowUnknown: true,
}));

module.exports.validateUser = ({ userName, userEmail, userPassword }) => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).presence(userName),
    email: Joi.string().email().presence(userEmail),
    password: Joi.string()
      .pattern(/[\w!@#&()$'{%}:;',?*~$^+=<>]/i)
      .presence(userPassword),
  }),
});

module.exports.validateCardCreate = celebrate({
  body: customJoi.object().keys({
    country: Joi.string().allow(null).required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailerLink: Joi.string().required().custom(valueCheck),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    id: Joi.number().required(),
  }),
});

module.exports.validateCardDelete = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
