const express = require('express');
const { check } = require('express-validator');
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('contact', 'Please enter a contact number').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  studentController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  studentController.login
);

router.put('/updateProfile', auth, studentController.updateProfile);

router.post('/applyJob', auth, studentController.applyJob);

router.get('/search', auth, studentController.searchJobs);

module.exports = router;
