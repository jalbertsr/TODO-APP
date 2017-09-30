[![NodeJS](https://github.com/MarioTerron/logo-images/blob/master/logos/nodejs.png)](https://nodejs.org/)
[![ExpressJS](https://github.com/MarioTerron/logo-images/blob/master/logos/expressjs.png)](http://expressjs.com///)
[![PugJS](https://github.com/MarioTerron/logo-images/blob/master/logos/pug.png)](http://www.pugjs.org/) 
[![ES6](https://github.com/MarioTerron/logo-images/blob/master/logos/es6.png)](http://www.ecma-international.org/ecma-262/6.0/) 
[![npm](https://github.com/MarioTerron/logo-images/blob/master/logos/npm.png)](https://www.npmjs.com/)

[![HTML5,CSS3 and JS](https://github.com/FransLopez/logo-images/blob/master/logos/html5-css3-js.png)](http://www.w3.org/) 
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# [TO DO APP](https://app-to-do.herokuapp.com/login/)

This project is a simple to-do list app build with Jade/PUG, CSS, jQuery, Express.js at [Skylab Coders Academy](http://www.skylabcoders.com) Full Stack Web Development Bootcamp.

## Installation

You can launch the app using some NPM scripts:

- `npm start` Will launch the app and will install the npm dependencies automatically
- `npm run dev` Will launch the app w/ nodemon so it will restart itself when any file of the project is modified and saved ignoring /data-db folder
- `npm run dev:debug` Will launch the `npm run dev` script w/ lots of debugging info about the app

## API Endpoints

All these endpoints will start locally w/ `http://localhost:3000`

Example: `http://localhost:3000/tasks`

### GET endpoints

#### [GET] `/tasks`
#### [GET] `/completed`
#### [GET] `/login`
#### [GET] `/registry`
#### [GET] `/logout`
#### [GET] `/error`

### POST endpoints

#### [POST] `/tasks`
#### [POST] `/login`
#### [POST] `/registry`

### PUT endpoints

#### [PUT] `/task/:id`
#### [PUT] `/edit/:id`

### DELETE endpoints

#### [DELETE] `/task/:id`
#### [DELETE] `/completed/:id`


## NOTE

In this project instead of using a formal database the user's email and password are being stored in a raw .txt, as a project complement I decided to use node core module `crypto` to encrypt and decrypt the personal information, so in consequence at `helpers/crypto.js` at line 3 I used a randomized ID to set the main keyword on which the algorithm `aes-256-ctr` will take as a the base to encrypt/decrypt, meaning every time the server is restarted, a new ID will be created and will make old data indecipherable. If you're using this in development change `const cryptoPass = createID()` to `const cryptoPass = 'yourSecretKey'`.
