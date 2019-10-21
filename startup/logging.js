const winston = require("winston");
// require('winston-mongodb');
require("express-async-errors");

module.exports = function() {
  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/donghu-rental'});

  //synchronous error handling
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //async error handling (for promises)
  process.on("unhandledRejection", ex => {
    //this exception will be logged by the function
    //winston.handleExceptions above
    throw ex;
  });
};
