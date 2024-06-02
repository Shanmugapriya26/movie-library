const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');
const User = require('./models/user');
const MovieList = require('./models/movieList');

const app = express();
// Connect flash
app.use(flash());

// Middleware for sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Middleware for Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware for BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/moviesRoutes');
const myListRoutes = require('./routes/myListRoutes');

// Use Routes
app.use(authRoutes);
app.use(movieRoutes);
app.use(myListRoutes);

// Connect to database
sequelize.sync()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));