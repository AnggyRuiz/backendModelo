const mongoose = require('mongoose');

const trxShema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
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
    errores: {
        type: Array,
    },
    err: {
        type: Boolean
    },
    findings: {
        type: Array
    },
    finding: {
        type: Boolean
    }
})
module.exports = mongoose.model('transaction', trxShema)