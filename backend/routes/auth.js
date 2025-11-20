const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getMe);
router.put('/profile', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;