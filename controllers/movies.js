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
    thumbnail,
    movieId,
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
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => new NotFoundError('Такого фильма не существует'))
    .then((movie) => {
      if (JSON.stringify(movie.owner._id) !== JSON.stringify(req.user._id)) {
        return next(new CardOwnerError('Нельзя удалить чужую карточку'));
      }
      return movie.remove().then(() => res.send({ message: 'Объект удален' }));
    })
    .catch(next);
};
