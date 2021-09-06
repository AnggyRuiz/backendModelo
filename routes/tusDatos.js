const router = require('express').Router();
const client = require('../index');
const request = require('request');
var mongoose = require('mongoose');

const username = 'pruebas';
const password = 'password';
const idToken = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

router.post('/launch', async(req, res) => {
    const __id = req.body.idUser;
    const doc = req.body.doc;
    const typedoc = req.body.typedoc;
    const fechaE = req.body.fechaE;
    console.log(doc, typedoc, fechaE);


    const options = {
        'method': 'POST',
        'url': 'http://docs.tusdatos.co/api/launch',
        'headers': {
            'accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': idToken
        },
        body: JSON.stringify({
            doc,
            typedoc,
            fechaE
        })
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        const trx = mongoose.model('User');
        trx.findById({ _id: __id }, (err, data) => {
            console.log(err, data);
            console.log(data.queryNum);
            const filter = { _id: __id };
            const update = { queryNum: data.queryNum -= 1 };
            console.log('aca', data.queryNum);
            trx.findByIdAndUpdate(filter, update, (err, res) => {
                if (err) throw new Error(err)
                console.log(res);
            })
        })

        res.send(response.body)
        console.log(response.body)
    })
})
router.post('/report', (req, res) => {
    console.log(req);
    const id = req.body.id;
    console.log(id);
    var options = {
        'method': 'GET',
        'url': `http://docs.tusdatos.co/api/report/${id}`,
        'headers': {
            'accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': idToken
        },

    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
        console.log(response.body);
    });

})
router.post('/result', (req, res) => {
    console.log(req.body.jobkey);
    const id = req.body.jobkey;
    console.log(id);
    var options = {
        'method': 'GET',
        'url': `http://docs.tusdatos.co/api/results/${id}`,
        'headers': {
            'accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': idToken
        },

    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
        console.log(response.body);
    });
})
module.exports = router;