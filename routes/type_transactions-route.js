const express = require('express')
const mongoose =  require('mongoose')
const type_transactions_model = require('../models/type_transactions-model')
const Type_Transactions = require('../schemas/type_transactions-schema')
const route = express.Router()

route.get('/', async (req, res) => {
    const ret = await type_transactions_model.all();

    res.status(200).json(ret);
})


route.post('/add', async (req, res) => {
    const {name_type} = req.body;
    const new_type_transacton = {};
    new_type_transacton.name_type = name_type;
    
    const ret = await type_transactions_model.add(new_type_transacton);

    res.status(201).json(ret);
})

module.exports = route