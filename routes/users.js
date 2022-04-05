const router = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const { validateUser } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUser({ userName: 'required', userEmail: 'required', userPassword: 'optional' }), updateProfile);

module.exports = router;
