// Routes for notebook (/nb)
const express = require('express');
const router = express.Router();

// Require controllers
const nbController = require('../controllers/nbController');

/// NOTEBOOK ROUTES ///=========================================================

// GET request for creating a new notebook
router.get('/create', nbController.nbCreate);

// GET request to renew notebook expiration
router.get('/:id/renew', nbController.nbRenew);

// GET request to delete a notebook
router.get('/:id/delete', nbController.nbDelete);

// GET request for a notebook's info
router.get('/:id', nbController.nbInfo);

module.exports = router;
