const express = require('express');
const router = express.Router();
const myListController = require('../controllers/myListController');
const { ensureAuthenticated } = require('../config/auth');

router.get('/list', ensureAuthenticated, myListController.myList);
router.get('/playlist/:playlistId', myListController.playlist);

router.post('/createPlaylist', ensureAuthenticated, myListController.createPlaylist);

module.exports = router;