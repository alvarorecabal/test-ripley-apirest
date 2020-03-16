const request = require('request');

/**
 * Metodo de conexion hacia los servicios de ripley
 * @method connection
 * @param Object dataToServices
 * @return 
 */
let connection = (dataToServices) => {

    const options = {
        url: dataToServices.url,
        method: dataToServices.method,
        headers: dataToServices.header,
        body: dataToServices.params,
        json: true
    }

    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
            try {
                if (response.statusCode == 200) {
                    resolve({
                        status: response.statusCode,
                        body
                    });
                } else {
                    resolve({
                        error: error,
                        body,
                        status: response.statusCode,
                        codigoResultado: -1
                    });
                }
            } catch (error) {
                reject({
                    status: 500,
                    error
                });
            }
        });
    });
};

module.exports = { connection };