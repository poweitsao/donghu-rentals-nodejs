const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer')

router.get('/', auth, async (req, res) =>{
    const customers = await Customer.find();
    console.log("customer get: ", customers);
    res.status(400).send(customers);
})

router.post('/', auth, async (req, res) =>{
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    await customer.save()
        .then(() => res.send(customer))
        .catch((error) => res.send(error.message));
})
//update
router.put('/:id', auth, async (req, res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Customer.findByIdAndUpdate(req.params.id,{
        $set:{name : req.body.name,
            phone : req.body.phone,
            isGold: req.body.isGold},
        new : true
    })
        .then(async(document)=> {
            if(document){
                const updatedCustomer = await Customer.findById(req.params.id);
                res.send(updatedCustomer)
            }
            else {res.status(404).send('The genre with the given ID was not found')}
        })
})

router.delete('/:id', auth, async (req, res)=> {
    Customer.findByIdAndDelete(req.params.id)
        .then((document)=> {
            if(document){res.send(document)}
            else {res.status(404).send('The genre with the given ID was not found')}
        })
})

module.exports = router;