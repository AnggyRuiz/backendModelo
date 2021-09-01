const express = require('express');
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
const tusDatos = require('./routes/tusDatos');
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./middleware/validate-token');
const transaction = require('./routes/transaction')
    //route middlewares
app.use('/api/user', authRoutes);
app.use('/api', tusDatos);
app.use('/api/dashboard', verifyToken, dashboadRoutes);
app.use('/api/trx', transaction)
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



// iniciae server
const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT} !`);
});