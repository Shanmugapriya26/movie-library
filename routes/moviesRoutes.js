const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { ensureAuthenticated } = require('../config/auth');

router.get('/home', ensureAuthenticated, movieController.home);

router.get('/search', ensureAuthenticated, movieController.search);
router.post('/search', ensureAuthenticated, movieController.searchMovies);

router.post('/addMovie', ensureAuthenticated, movieController.addMovie);

router.post('/list', ensureAuthenticated, movieController.createList);

module.exports = router;