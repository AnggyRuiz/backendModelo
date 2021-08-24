const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
require('dotenv').config();
const app = express();


// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


// capturar body 
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//conexion a BD
const uri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.lwm4s.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, option).then(() => {
    console.log('Conexion BD')
}).catch(e => console.log(e))

//import rutas
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./middleware/validate-token');
//route middlewares
app.use('/api/user', authRoutes);
app.use('/api/dashboard', verifyToken, dashboadRoutes);

/* app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona'
    })
}) */
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));
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
        res.json(response.body)
        console.log(response.body)
    })
})

// iniciae server
const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT} !`);
});