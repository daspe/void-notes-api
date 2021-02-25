// Routes for notebook (/nb)
const express = require('express');
const router = express.Router();

// Require controllers
const nbController = require('../controllers/nbController');
const noteController = require('../controllers/noteController');

/// NOTEBOOK ROUTES ///=========================================================

// GET redirect to site index
router.get('/nb', (req, res) => res.redirect('/'));

// POST request for creating a new notebook
router.post('/nb/create', nbController.nbCreate);

// GET request for creating a new notebook (BLOCKED)
router.get('/nb/create', (req, res) => res.status(405).send('GET Method Not Allowed'));

// PUT request to renew notebook expiration
router.put('/nb/:key/renew', nbController.nbRenew);

// GET request to renew notebook expiration (BLOCKED)
router.get('/nb/:key/renew', (req, res) => res.status(405).send('GET Method Not Allowed'));

// DELETE request to delete a notebook
router.delete('/nb/:key/delete', nbController.nbDelete);

// GET request to delete a notebook (BLOCKED)
router.get('/nb/:key/delete', (req, res) => res.status(405).send('GET Method Not Allowed'));

// GET request for a notebook's info
router.get('/nb/:key', nbController.nbInfo);

/// NOTE ROUTES ///=============================================================

/// POST request to create a new note
router.post('/note/:key/create', noteController.noteCreate);

// GET request to create a new note (BLOCKED)
router.get('/note/:key/create', (req, res) => res.status(405).send('GET Method Not Allowed'));

/// PUT request to edit a note
router.put('/note/:key/:id/edit', noteController.noteEdit);

// GET request to edit a note (BLOCKED)
router.get('/note/:key/:id/edit', (req, res) => res.status(405).send('GET Method Not Allowed'));

/// DELETE request to delete a note
router.delete('/note/:key/:id/delete', noteController.noteDelete);

// GET request to delete a note (BLOCKED)
router.get('/note/:key/:id/delete', (req, res) => res.status(405).send('GET Method Not Allowed'));

/// GET request for a note's info
router.get('/note/:key/:id', noteController.noteInfo);

/// GET request to list all notes in a notebook
router.get('/notes/:key', noteController.noteInfoList);

module.exports = router;