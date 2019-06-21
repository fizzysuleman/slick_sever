const winston=require('winston')
const mongoose=require('mongoose')
const config=require('config')
module.exports = function () {
    //connecting to our local mongodb 
    let db=config.get('slick_db')
    mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: true })
        .then(() => winston.info('Connected to mongo'))
}