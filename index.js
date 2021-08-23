const express = require('express');
const app = express();
const request = require('request');

app.get('/launch', (req, res) => {
    const username = 'pruebas';
    const password = 'password';
    const idToken = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    var options = {
        'method': 'POST',
        'url': 'http://docs.tusdatos.co/api/launch',
        'headers': {
            'accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': idToken
        },
        body: JSON.stringify({
            'doc': 123,
            'typedoc': 'CC',
            'fechaE': '01/12/2017'

        }),

    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        res.send(response.body)
        console.log(response.body)
    })
})


app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});