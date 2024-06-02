const axios = require('axios');
const MovieList = require('../models/movieList');
require('dotenv').config();

exports.home = async (req, res) => {
    res.render('home', { user: req.user });
};

exports.search = async (req, res) => {
    const lists = await MovieList.findAll({ where: { userId: req.user.id } });
    res.render('search', { movies: null, lists });
};

exports.searchMovies = async (req, res) => {
    const { title } = req.body;
    const key = process.env.OMDB_API_KEY;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}`);
        const lists = await MovieList.findAll({ where: { userId: req.user.id } }) || [];
        res.render('search', { movies: response.data.Search, lists });
    } catch (err) {
        console.log(err);
    }
};

exports.addMovie = async (req, res) => {
    const { movieId, listId, newListName, isPublic } = req.body;
    try {
        let list;
        if (listId === 'new') {
            list = await MovieList.create({
                userId: req.user.id,
                name: newListName,
                movies: [movieId],
                isPublic: isPublic === 'true'
            });
        } else {
            list = await MovieList.findOne({ where: { id: listId, userId: req.user.id } });
            if (list) {
                let currentMovies = list.get('movies');
                if (!Array.isArray(currentMovies)) {
                    list.set('movies', []);
                }
                currentMovies.push(movieId);
                list.set('movies', currentMovies);
                await list.save();
            } else {
                return res.json({ success: false, message: 'Playlist not found' });
            }
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to add movie to playlist' });
    }
};

exports.createList = (req, res) => {
    const { name, movies, isPublic } = req.body;
    MovieList.create({
        userId: req.user.id,
        name,
        movies,
        isPublic: isPublic === 'on'
    }).then(() => res.redirect('/home'))
      .catch(err => console.log(err));
};