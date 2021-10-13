const router = require('express').Router();
const trxShema = require("../models/Transaction")
var mongoose = require('mongoose');

router.post('/saveTransaction', async(req, res) => {
    const typeDoc = req.body.typeDoc;
    console.clear()
    console.log(req.body.name);
    const trx = new trxShema({
        id: req.body.id,
        name: req.body.name,
        idUser: req.body.idUser,
        jobId: req.body.jobId,
        errores: req.body.errores,
        findings: req.body.findings,
        err: req.body.error,
        finding: req.body.finding,
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
        // console.log(err, data, data.length);
        res.json(data)
    });
});
router.post('/changeTrx', (req, res) => {
    const _id = req.body._id

    const trxChange = mongoose.model('transaction');
    const filter = { _id: _id };
    const update = {
        id: req.body.id,
        name: req.body.name,
        idUser: req.body.idUser,
        jobId: req.body.jobId,
        errores: req.body.errores,
        findings: req.body.findings,
        err: req.body.err,
        finding: req.body.finding,
        typeDoc: req.body.typedoc
    };
    trxChange.findByIdAndUpdate(filter, update, (err, resp) => {
        if (err) throw new Error(err)
            // console.log('ACA', resp);
        res.json(resp)
    })
})
module.exports = router;