
const express = require('express');
//routers
const genres = require('../routes/genres');
const homepage = require('../routes/homepage');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

const error = require('../middleware/error');



module.exports = function(app){

    //middleware
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));

    //direct all routes of '/api/XXX' to the genres router.
    app.use('/api/genres', genres);
    app.use('/', homepage);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error);
}