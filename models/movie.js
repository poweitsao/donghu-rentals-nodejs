const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre.js');

const movieSchema = new mongoose.Schema({
    title: {type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255},
    genre: {type: genreSchema,
        required: true},
    numberInStock: {type: Number,
        required: true,
        minlength: 0,
        maxlength: 255},
    dailyRentalRate: {type: Number,
        required: true,
        minlength: 0,
        maxlength: 255}
})

const Movie = mongoose.model('Movie', movieSchema);

//Joi schema: what the client sends us. Different from mongo schema
function validateMovie(movie){
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        genreID: Joi.objectID().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    const result = Joi.validate(movie, schema);
    return result;
}


exports.Movie = Movie;
exports.validate = validateMovie;

// createMovie('Tron', new Genre({ name: 'Sci-Fi' }, 10, 50));
