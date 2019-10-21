const Joi = require('joi');
const mongoose = require('mongoose');


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {type: String, 
                required: true,
                minlength: 2,
                maxlength: 12},
            isGold:{ type: Boolean,
                required: true},
            phone: {type: String,
                minlength: 5,
                maxlength: 40,
                required: true}}),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title: {type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 255},
            dailyRentalRate: {type: Number,
                required: true,
                minlength: 0,
                maxlength: 255},
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee:{
        type: Number,
        min: 0
    }
}));

function validateRental(rental){
    const schema ={
        customerID: Joi.objectID().required(),
        movieID: Joi.objectID().required()
    };
    return Joi.validate(rental, schema);

}

exports.Rental = Rental;
exports.validate = validateRental;