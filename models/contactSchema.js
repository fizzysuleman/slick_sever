const mongoose=require('mongoose')
const Joi = require('joi');

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const contactSchema = new mongoose.Schema({
  platformContacted:String,
  timeContacted:Date,
  userId:String,
  sellerId:String
});

const Contact=mongoose.model('Contact',contactSchema)



  exports.Contact=Contact
