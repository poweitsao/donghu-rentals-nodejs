const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const{User, validate} = require('../models/user');

//get info about the current user. gets info from json web token
router.get('/me', auth, async(req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.get('/', auth, async (req, res) =>{
    const users = await User.find();
    res.send(users);
})

//register new user
router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) res.status(400).send(`User "${req.body.email}" is already registered!`);

    user = new User(_.pick(req.body,['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    const token = user.generateAuthToken();
    //lodash.pick -> give it an object and specify properties 
    // in an array. it will only return the specified properties
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))

})

module.exports = router;