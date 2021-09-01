const mongoose = require('mongoose');

const trxShema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('transaction', trxShema)