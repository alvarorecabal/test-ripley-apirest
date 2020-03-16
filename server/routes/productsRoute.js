const express = require('express');
const { getProductList, getProductById } = require('../middlewares/products');
const { verificationTokenActive } = require('../middlewares/verificationToken');
const app = express();

app.post('/getListProducts', verificationTokenActive, getProductList);
app.post('/getProductByID', verificationTokenActive, getProductById);

module.exports = app;