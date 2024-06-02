const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Register Controller
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            // If username already exists, return an error message
            req.flash('error_msg', 'Username already exists');
            return res.redirect('/register');
        }

        // If username is unique, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error_msg', 'An error occurred. Please try again later.');
        res.redirect('/register');
    }
};

// Login Controller
exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

// Logout Controller
exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login');
    });
};

// Passport Strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { message: 'No user with that username' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});