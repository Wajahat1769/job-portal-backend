const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const employerController = require('../controllers/employerController');
const authMiddleware = require('../middleware/auth');
const { requireEmployerRole } = require('../middleware/roleMiddleware');

// Add requireEmployerRole middleware to the routes where only employers should have access
router.post('/register', employerController.register);
router.post('/login', employerController.login);
router.put('/profile', authMiddleware, requireEmployerRole, employerController.updateProfile);
router.post('/jobs', authMiddleware, requireEmployerRole, employerController.postJob);
router.put('/jobs/:jobId/applications/:applicationId', authMiddleware, requireEmployerRole, employerController.reviewApplications);

module.exports = router;
