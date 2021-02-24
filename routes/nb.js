// Routes for notebook (/nb)
const express = require('express');
const router = express.Router();

// Require controllers
const nbController = require('../controllers/nbController');

/// NOTEBOOK ROUTES ///=========================================================

// GET redirect to site index
router.get('/', (req, res) => res.redirect('/'));

// GET request for creating a new notebook
router.get('/create', nbController.nbCreate);

// GET request to renew notebook expiration
router.get('/:key/renew', nbController.nbRenew);

// GET request to delete a notebook
router.get('/:key/delete', nbController.nbDelete);

// GET request for a notebook's info
router.get('/:key', nbController.nbInfo);

module.exports = router;