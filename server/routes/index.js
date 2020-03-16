const express = require('express');
const app = express();

app.use('/auth', require('./authRoute'));
app.use('/product', require('./productsRoute'));

module.exports = app;