const mongoose=require('mongoose')

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const contactUsSchema = new mongoose.Schema({
  userId:String,
  message:String,
  timeReported:Date,
  read:String
});

const ContactUs=mongoose.model('ContactUs',contactUsSchema)



  exports.ContactUs=ContactUs
