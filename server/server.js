const express = require('express');
const redis = require("redis");
const cors = require('cors');
const bodyParser = require('body-parser');
const NODE_ENV = process.env.NODE_ENV || 'dev';

require('dotenv').config({
    path: `.env.${NODE_ENV}`
});

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json());
// Configuración global de rutas
app.use(require('./routes/index'));

const client = redis.createClient();
client.on('connect', function() {
    console.log('connect to redis');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});