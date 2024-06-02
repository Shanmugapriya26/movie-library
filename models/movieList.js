const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovieList = sequelize.define('MovieList', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movies: {
        type: DataTypes.JSON, // Store movies as JSON data type
        defaultValue: [],     // Default value is an empty array
        get() {
            const movies = this.getDataValue('movies');
            return movies ? JSON.parse(movies) : []; // Parse JSON string to array
        },
        set(movies) {
            this.setDataValue('movies', JSON.stringify(movies)); // Stringify array to JSON string
        }
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Define instance method to retrieve movies
MovieList.prototype.getMovies = function() {
    return this.movies; // Return the movies array
};

module.exports = MovieList;