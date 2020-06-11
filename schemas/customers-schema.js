const mongoose = require('mongoose')

const customer = new mongoose.Schema({
    full_name: String,
    address: String,
    email: String,
    phone_number: String,
    username: String,
    password: String,
    day_of_birth: String,
    permission: Number
})

module.exports = Customer = mongoose.model('customers', customer);