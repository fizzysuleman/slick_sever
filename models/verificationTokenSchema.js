const mongoose=require('mongoose')
const Joi = require('joi');
const JoiPhone = Joi.extend(require('joi-phone-number'));
const config=require('config')
const jwt=require('jsonwebtoken')


//schema for generating token
const tokenSchema=new mongoose.Schema({
      token:{
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 6
      },
      creationDate:{
        type: Date,
        required: true,
      },
      expiryDate:{
        type: Date,
        required: true,
      },
      activated: {
        type: Boolean,
        required:true
       },
       phone: {
        type: String,
        required: true,
        // minlength: 5,
        // maxlength: 255,
        unique: false
      },    
      // email: {
      //   type: String,
      //   required: true,
      //   minlength: 5,
      //   maxlength: 255,
      //   unique: false
      // },    

})



const VerificationBuyerToken=mongoose.model('VerificationBuyerToken',tokenSchema)

const VerificationSellerToken=mongoose.model('VerificationSellerToken',tokenSchema)


//joi validation
function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(1).max(50).required(),
    lastName:Joi.string().min(1).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone:Joi.number().required(),

    

  }
  return Joi.validate(user, schema);
  }
exports.VerificationBuyerToken=VerificationBuyerToken;
exports.VerificationSellerToken=VerificationSellerToken
exports.validate=validateUser

  
