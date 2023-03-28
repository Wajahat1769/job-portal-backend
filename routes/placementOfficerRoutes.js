const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const placementOfficerController = require('../controllers/placementOfficerController');
const authMiddleware = require('../middleware/auth');
const { requirePlacementOfficerRole } = require('../middleware/roleMiddleware');

// Add requirePlacementOfficerRole middleware to the routes where only placement officers should have access
router.post('/register', placementOfficerController.register);
router.post('/login', placementOfficerController.login);
// router.get('/profile', authMiddleware, requirePlacementOfficerRole, placementOfficerController.getProfile);
router.put('/profile', authMiddleware, requirePlacementOfficerRole, placementOfficerController.updateProfile);

module.exports = router;
