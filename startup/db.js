const winston=require('winston')
const mongoose=require('mongoose')
module.exports = function () {
    //connecting to our local mongodb 
    mongoose.connect('mongodb://localhost/slicky', { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: true })
        .then(() => winston.info('Connected to mongo'))
}