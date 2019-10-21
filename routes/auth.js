const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');


router.get('/', async (req, res) =>{
    const users = await User.find();
    res.send(users);
})

//user login
router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);

    // res.send(`Login successful. Welcome, ${user.name}!`); 
})

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    const result = Joi.validate(req.body, schema);
    return result;
}

module.exports = router;