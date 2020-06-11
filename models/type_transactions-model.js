const Type_Transactions = require('../schemas/type_transactions-schema')

module.exports = {
    all: _ => {
        return Type_Transactions.find().exec();
    },
    add: entity => {
        // entity = {
        //     "name": "sending" || "receiving" || "reminding debt"
        // }

        return Type_Transactions.create(entity);
    }
}