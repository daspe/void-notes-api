// Routes for notebook (/nb)
const express = require('express');
const router = express.Router();

// Require controllers
const nbController = require('../controllers/nbController');
const noteController = require('../controllers/noteController');

/// NOTEBOOK ROUTES ///=========================================================

// GET redirect to site index
router.get('/nb', (req, res) => res.redirect('/'));

// GET request for creating a new notebook
router.get('/nb/create', nbController.nbCreate);

// GET request to renew notebook expiration
router.get('/nb/:key/renew', nbController.nbRenew);

// GET request to delete a notebook
router.get('/nb/:key/delete', nbController.nbDelete);

// GET request for a notebook's info
router.get('/nb/:key', nbController.nbInfo);

/// NOTE ROUTES ///=============================================================

/// POST request to create a new note
router.post('/note/:key/create', noteController.noteCreate);

/// PUT request to edit a note
router.put('/note/:key/:id/edit', noteController.noteEdit);

/// GET request to delete a note
router.get('/note/:key/:id/delete', noteController.noteDelete);

/// GET request for a note's info
router.get('/note/:key/:id', noteController.noteInfo);

/// GET request to list all notes in a notebook
router.get('/notes/:key', noteController.noteInfoList);

module.exports = router;