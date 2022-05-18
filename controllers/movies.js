const Movie = require('../models/movie');
const CardOwnerError = require('../errors/CardOwnerError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError('Такого фильма не существует'))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id.toString()) {
        return next(new CardOwnerError('Нельзя удалить чужую карточку'));
      }
      return movie.remove().then(() => res.send({ message: 'Объект удален' }));
    })
    .catch(next);
};
