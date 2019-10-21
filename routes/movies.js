const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const{Movie, validate} = require('../models/movie');
const{Genre} = require('../models/genre');

router.get('/', auth, async(req, res)=>{
    const movies = await Movie.find();
        res.send(movies);
        
        // console.log('movies.get moveies:', movies)
})

router.post('/', auth, async (req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreID);
    if (!genre) return res.status(400).send("Invalid Genre");
    
    // console.debug('movie post genre', genre);
    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save()
    .then(()=>{
        // console.log("movies.get",movie);
        res.send(movie);
    })
    .catch((error)=>{
        res.send(error.message);  
    });
    // console.log('movies.post genreID:', req.body.genreID)
    // console.log('movies.post genre:', genre)
})



router.put('/:id', auth, async (req, res)=>{
    // console.log('movies.put started')
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreID);
    // console.log('movies.put genre:', genre)
    Movie.findByIdAndUpdate(req.params.id, {
        $set:{
            title: req.body.title,
            genre: genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            new: true
        }

    })
        .then(async(document)=>{
            if (document)
                {const updatedMovie = await Movie.findById(req.params.id)
                res.send(updatedMovie);}
            else res.status(404).send('The movie with the given ID was not found')
            })
})

router.delete('/:id', auth, async(req, res)=>{
    // console.log('movies.delete started');
    Movie.findByIdAndDelete(req.params.id)
        .then((document)=>{
            // console.log('movies.delete document:', document);
            if(document) res.send(document);
            else res.status(404).send('The movie with the given ID was not found');
        })
})
module.exports.Movie = Movie;
module.exports = router;