const router = require('express').Router();
const trxShema = require("../models/Transaction")

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
})
module.exports = router;