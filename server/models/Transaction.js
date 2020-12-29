const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
    amount: Number,
    category: String,
    vendor: String
});

const Transaction = mongoose.model('Transaction', transaction, 'Transactions');

module.exports = Transaction;