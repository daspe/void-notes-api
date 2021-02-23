// Routes for index (/)
const express = require('express');
const router = express.Router();

// Require controllers
const indexController = require('../controllers/indexController');

/// INDEX ROUTES ///=========================================================

// GET site home page.
router.get('/', indexController.index);

module.exports = router;