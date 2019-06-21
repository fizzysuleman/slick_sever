const config = require('config')

module.exports = function () {
    //using the config with jwtPrivateKey in the environment variables
    if (!config.get('jwtPrivateKey')) {
        throw new Error('jwtPrivateKey is not defined')
        
    }
}