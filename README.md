# Movie App

This is a Node.js application for managing and searching movies, allowing users to create custom movie lists. The application uses Express for the server, Sequelize for database interaction, Passport.js for authentication, and EJS for templating.

## Features

- User registration and login
- Movie search using the OMDB API
- Create, view, and manage custom movie lists
- Public and private movie lists
- Flash messages for user feedback

## Installation

### Prerequisites

Ensure you have the following installed:

* [![EJS][EJS]][EJS-url]
* [![CSS][CSS]][CSS-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Node.js][Node.js]][Node-url]
* [![MySQL][MySQL]][MySQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Links and Images -->

[EJS]: https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge&logo=javascript&logoColor=white
[EJS-url]: https://ejs.co/

[CSS]: https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[MySQL]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/


### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <directory-name>

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   Create a .env file in the root of the project with the following content:
   ```env
   OMDB_API_KEY=<your-omdb-api-key>
   DB_NAME=<your-db-name>
   DB_USER=<your-user-name>
   DB_PASSWORD=<your-db-password>
   DB_HOST=<your-host-name>

4. **Start the application:**
   ```bash
   npm start
   ```
   The application should be running on http://localhost:5000.


### Contributing

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/fooBar).
3. Commit your changes (git commit -am 'Add some fooBar').
4. Push to the branch (git push origin feature/fooBar).
5. Create a new Pull Request

### License

This project is licensed under the MIT License.

