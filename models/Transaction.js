const mongoose = require('mongoose');

const trxShema = mongoose.Schema({
    id: {
        type: String,
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
    },
    typeDoc: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    errors: {
        type: Array,
    },
    findings: {
        type: Array
    }
})
module.exports = mongoose.model('transaction', trxShema)