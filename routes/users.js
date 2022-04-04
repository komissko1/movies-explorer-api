const router = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const { validateUser } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUser({ name: true, email: true, password: false }), updateProfile);

module.exports = router;
