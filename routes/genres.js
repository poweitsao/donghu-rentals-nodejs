const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const{Genre, validate} = require('../models/genre');
const validateObjectID = require('../middleware/validateObjectID')

//all routes in this file have /api/genres pointed to it, 
//so route doesn't need to repeat it.
router.get('/', async (req, res, next) =>{
        const genres = await Genre.find().sort('name');
        //  console.log('genres.get: ', genres);
        res.send(genres);
});

router.get('/:id', validateObjectID, async( req, res) =>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('The specified genre was not found.');

    res.send(genre);
})

//add a new item to genres
router.post('/', auth, async (req, res) => {    

    // console.log('post request started');
    const genre = new Genre({name: req.body.name});
    // console.log('post genre: ', genre);
    
        await genre.save()
            .then(()=> {
                // console.log('post result: ', genre)
                res.send(genre);
            })
            .catch((error)=>{
                // for (field in error.errors){
                        // console.log(error.errors[field].message);
                // }
                res.status(400).send(error.message);  
            });
})

//update genres
router.put('/:id', auth, async (req, res) =>{

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    Genre.findByIdAndUpdate(req.params.id,{
        $set:{name: req.body.name},
        new: true})
        .then(async(document) => {
            if(document){
                const updatedGenre = await Genre.findById(req.params.id);
                res.send(updatedGenre)
            }
            else res.status(404).send('The genre with the given ID was not found')
        })
})

router.delete('/:id', [auth, admin], async (req, res) => {
    Genre.findByIdAndDelete(req.params.id)
        .then((document)=>{
            if (document) {res.send(document)}
            else {res.status(404).send('The genre with the given ID was not found')};
        })
})

module.exports = router;