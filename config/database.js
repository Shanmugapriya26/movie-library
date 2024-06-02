const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('movie_library', 'root', 'Sampriya@260903', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err.message));

module.exports = sequelize;
