const router = require('express').Router();
const request = require('request');
var mongoose = require('mongoose');

//PROD
const username = 'sosorno@isciolab.com';
const password = 'Telmo2021';
//Desarrollo

/* const username = 'pruebas';
const password = 'password'; */
const idToken = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

router.post('/launch', (req, res) => {
    const doc = req.body.doc;
    const typedoc = req.body.typedoc;
    const fechaE = req.body.fechaE;
    const queryNum = req.body.queryNum
    const _id = req.body.id
    console.log(doc, typedoc, fechaE);


    var options = {
        'method': 'POST',
        'url': '  https://dash-board.tusdatos.co/api/launch',
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
        const filter = { _id: _id };
        const update = { queryNum: queryNum };
        trx.findByIdAndUpdate(filter, update, (err, res) => {
            if (err) throw new Error(err)
            console.log('ACA', res);
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
        'url': `  https://dash-board.tusdatos.co/api/report_pdf/${id}`,
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
        'url': `  https://dash-board.tusdatos.co/api/results/${id}`,
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
router.post('/retry', (req, res) => {
    console.log(req.body.id);
    const id = req.body.id;
    const typedoc = req.body.typedoc
    console.log(typedoc);
    var options = {
        'method': 'GET',
        'url': `  https://dash-board.tusdatos.co/api/retry/${id}?typedoc=${typedoc}`,
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
router.post('/getPlans', (req, res) => {
    var options = {
        'method': 'GET',
        'url': ' https://dash-board.tusdatos.co/api/plans',
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