const router = require('express').Router();
const trxShema = require("../models/Transaction")
var mongoose = require('mongoose');

router.post('/saveTransaction', async(req, res) => {
    const typeDoc = req.body.typeDoc;

    const trx = new trxShema({
        id: req.body.id,
        name: req.body.name,
        idUser: req.body.idUser,
        typeDoc
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
router.post('/getTrx', (req, res) => {
    idUser = req.body.idUser
    var trx = mongoose.model('transaction');
    trx.find({ idUser }, (err, data) => {
        console.log(err, data, data.length);
        res.json(data)
    });

})
module.exports = router;