const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer')
//library for easy MongoDB transactions (two phase commits)
const Fawn = require('fawn');
Fawn.init(mongoose);

//Get the list of rentals
//GET /api/rentals
router.get('/', auth, async(req, res)=>{
    const rentals = await Rental.find();
    res.send(rentals);
})

//Create a new rental
//POST /api/rentals

router.post('/', auth, async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerID);
    if(!customer) return res.status(400).send("Invalid Customer");

    const movie = await Movie.findById(req.body.movieID);
    if(!movie) return res.status(400).send("Invalid Movie");

    if(movie.numberInStock === 0) return res.status(400).send("Movie not in stock!");

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    })
    try
    {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1}
            })
            .run();
        }
    catch (ex){
        res.status(500).send('Something failed');
    }
    res.send(rental);
    })
    
module.exports = router;