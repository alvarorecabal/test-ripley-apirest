const { setInRedis } = require('../services/redisDB');
const { connection } = require('../services/connection');
require('dotenv').config();


let createNewUser = async(req, res) => {
    try {
        let body = req.body;
        let dataToServices = {
            method: 'POST',
            url: process.env.CREATE_USER_FIREBASE + process.env.FIREBASE_KEY,
            params: body
        };
        let response = await connection(dataToServices);
        if (response.status == 200) {
            res.status(200).send({
                ok: true,
                msg: 'Usuario creado'
            });
        } else {
            res.status(400).send({
                ok: false,
                msg: 'Usuario ya existe'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

let userLogin = async(req, res) => {
    try {
        let body = req.body;
        let dataToServices = {
            method: 'POST',
            url: process.env.LOGIN_USER_FIREBASE + process.env.FIREBASE_KEY,
            params: body
        };
        let response = await connection(dataToServices);
        if (response.status == 200) {
            await setInRedis('idToken', response.body.idToken, response.body.expiresIn);
            res.status(200).send({
                ok: true,
                msg: 'autorizado',
                idToken: response.body.idToken,
            });
        } else {
            res.status(401).send({
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = { createNewUser, userLogin }