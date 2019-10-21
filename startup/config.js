const config = require('config');

module.exports = function(){
    //checking if jwt is defined in env variables
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not definied');
    }
}