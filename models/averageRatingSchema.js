const mongoose=require('mongoose')
const Joi = require('joi');


const averageRatingSchema = new mongoose.Schema({
    sellerId:String,
    totalRating:Number,
    numberOfRatings:Number,
    averageRating:Number
});

const AverageRating=mongoose.model('AverageRating',averageRatingSchema)



  exports.AverageRating=AverageRating
