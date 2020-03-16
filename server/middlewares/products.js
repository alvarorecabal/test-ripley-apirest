const { connection } = require('../services/connection');
const { setInRedis, getProductInRedis } = require('../services/redisDB');

let getProductList = (req, res) => {
    try {
        const listProducts = require('../listProducts/listProducts');
        res.status(200).send({
            ok: true,
            products: listProducts
        });
    } catch (error) {
        res.status(500).send(error);
    }

}

let getProductById = async(req, res) => {
    let id = req.body.id;
    let dataToServices = {
        method: 'GET',
        url: process.env.GET_PRODUCT_BY_ID + id
    };

    let response;
    let body = await getProductInRedis(id);
    if (body == null) {
        response = await connection(dataToServices);
        let errorRamdon = Math.floor(Math.random() * 100) + 1;
        while (errorRamdon <= 15) {
            response = '';
            console.log(`ERROR: ----------------- getProductById ---------------- error del ${errorRamdon}%`);
            try {
                response = await connection(dataToServices);
                errorRamdon = Math.floor(Math.random() * 100) + 1;
            } catch (error) {
                res.status(500).send(error);
            }
        }
    } else {
        return res.status(200).send(body);
    }

    if (response.status == 200) {
        let data = {
            status: response.status,
            id: response.body.uniqueID,
            name: response.body.name,
            image: response.body.fullImage,
            marca: response.body.attributes[0].value,
            description: response.body.longDescription,
            offerPrice: response.body.prices.offerPrice,
            listPrice: response.body.prices.listPrice,
            cardPrice: response.body.prices.cardPrice,
            attributes: response.body.attributes
        }

        await setInRedis(id, JSON.stringify(data), 120);
        res.status(response.status).send(data);
    } else if (response.status == 404) {
        res.status(response.status).send({ msg: 'Producto no encontrado' });
    } else {
        res.status(500).send('Error server');
    }

}

module.exports = { getProductList, getProductById }