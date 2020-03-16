const redis = require("redis");
const client = redis.createClient();

let setInRedis = (key, value, expiresIn) => {
    client.set(key, value, (err) => {
        if (err) {
            return false;
        }
        client.expire(key, Number(expiresIn));
    });
}

let getTokenInRedis = () => {
    return new Promise((resolve, reject) => {
        client.get('idToken', (err, token) => {
            if (err) {
                reject(false);
            } else {
                resolve(token);
            }
        });
    });
}

let getProductInRedis = (id) => {
    return new Promise((resolve, reject) => {
        client.get(id, (err, producto) => {
            if (err) {
                reject(false);
            } else {
                resolve(JSON.parse(producto));
            }
        })
    });
}


module.exports = { setInRedis, getTokenInRedis, getProductInRedis }