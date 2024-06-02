const axios = require('axios');
const MovieList = require('../models/movieList');
const { ensureAuthenticated } = require('../config/auth')

exports.myList = async (req, res) => {
    try {
        const playlists = await MovieList.findAll({ where: { userId: req.user.id } });
        res.render('myList', { playlists });
    } catch (err) {
        console.log(err);
        res.redirect('/home');
    }
};

exports.playlist = async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await MovieList.findByPk(playlistId);
    if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    if (playlist.isPublic) {
        const moviesList = await fetchMovies(playlist.movies);
        res.render('playlist', { playlistName: playlist.name, movies: moviesList });
    } else {
        ensureAuthenticated(req, res, async () => {
            const moviesList = await fetchMovies(playlist.movies);
            res.render('playlist', { playlistName: playlist.name, movies: moviesList });
        });
    }
};

async function fetchMovies(movieIds) {
    const moviesList = await Promise.all(movieIds.map(async movieId => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`);
            const movie = response.data;
            return { title: movie.Title, year: movie.Year, poster: movie.Poster };
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }));
    return moviesList.filter(movie => movie !== null);
}

exports.createPlaylist = async (req, res) => {
    try {
        const { name, isPublic } = req.body;
        const list = await MovieList.create({
            userId: req.user.id,
            name,
            movies: [],
            isPublic: isPublic === 'on'
        });
        return res.json({ success: true });
    } catch (error) {
        console.error('Error creating playlist:', error);
        return res.json({ success: false });
    }
};