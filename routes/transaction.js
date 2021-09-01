const router = require('express').Router();
const trxShema = require("../models/Transaction")
var mongoose = require('mongoose');

router.post('/saveTransaction', async(req, res) => {
    const trx = new trxShema({
        id: req.body.id,
        name: req.body.name
    });
    try {
        const trxDB = await trx.save();
        res.json({
            error: null,
            data: trxDB
        })
    } catch (error) {
        res.status(400).json({ error })
    }
});
router.get('/getTrx', (req, res) => {
    var trx = mongoose.model('transaction');
    trx.find({}, (err, data) => {
        console.log(err, data, data.length);
        res.json(data)
    });

})
module.exports = router;