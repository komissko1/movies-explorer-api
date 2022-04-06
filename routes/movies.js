const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateCardCreate, validateCardDelete } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validateCardCreate, createMovie);
router.delete('/:_id', validateCardDelete, deleteMovie);

module.exports = router;
