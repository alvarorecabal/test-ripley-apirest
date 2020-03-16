let { getTokenInRedis } = require('../services/redisDB');

let verificationTokenActive = async(req, res, next) => {
    let token = req.headers.token;
    if (typeof token == 'undefined') {
        return res.status(401).send({
            ok: false,
            msg: 'Token invalido'
        });
    }

    let tokenInDB = await getTokenInRedis();
    if (token == tokenInDB) {
        next();
    } else {
        return res.status(401).send({
            ok: false,
            msg: 'Token invalido'
        });
    }
}

module.exports = { verificationTokenActive }