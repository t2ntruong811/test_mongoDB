const mongoose = require('mongoose');

const type_transaction = new mongoose.Schema({
    name_type: String
})

module.exports = Type_Transactions = mongoose.model('type_transactions', type_transaction); 