const mongoose=require('mongoose')
const Joi = require('joi');


const ratingSchema = new mongoose.Schema({
  userId:String,
  sellerId:String,
  rating:Number
});

const Rating=mongoose.model('Rating',ratingSchema)



  exports.Rating=Rating
