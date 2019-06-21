const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')
const config=require('config')

module.exports=function(){
  let db=config.get('db')

    process.on('unhandledRejection', (ex) => {
        throw (ex)
      })
      
      
      winston.configure({
        transports:
          [
            new winston.transports.Console({
                colorize: true, prettyPrint: true,level:'silly',handleExceptions: true
              }),
            new winston.transports.File({
              filename: 'logfile.log', handleExceptions: true
            }),

            // new winston.transports.MongoDB({ 
              
            //   db: db,
            //   level: 'info',
            //   handleExceptions: true
            // }),
      
          ],
        exitOnError:false
      });
      
}