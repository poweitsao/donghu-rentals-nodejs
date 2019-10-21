//debugger. can toggle debugger logs using environment vars
const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan');

module.exports = function(app){
    //enables request logging only when environment is development
    if(app.get('env') === 'development'){
        app.use(morgan('tiny')); //logs requests
        startupDebugger('Morgan enabled');
    }
}