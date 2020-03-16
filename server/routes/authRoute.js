const express = require('express');
const { createNewUser, userLogin } = require('../middlewares/auth');
const app = express();

app.post('/createuser', createNewUser);
app.post('/login', userLogin);

module.exports = app;