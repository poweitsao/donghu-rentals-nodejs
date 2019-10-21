const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold:{ type: Boolean,
        required: true},
    name: {type: String, 
        required: true,
        minlength: 2,
        maxlength: 12},
    phone: {type: String,
        minlength: 5,
        required: true}
}));

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(2).max(12).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(5).required()
    }
    const result = Joi.validate(customer, schema);
    return result;
}

exports.Customer = Customer;
exports.validate = validateCustomer;