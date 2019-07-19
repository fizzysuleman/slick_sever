const mongoose=require('mongoose')
const Joi = require('joi');
const jwt=require('jsonwebtoken')
const config=require('config')



//schema for generating token
const tokenSchema=new mongoose.Schema({
    userId:{
        type:String
    },
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
      used: {
        type: Boolean,
        required:true
       },
       email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: false
      },
      username:{
        type:String
      }    

})

tokenSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({userId:this.userId,username:this.username},config.get('jwtPrivateKey'),{expiresIn:'1d'})
  return token
}



const ForgotPasswordToken=mongoose.model('ForgotPasswordToken',tokenSchema)

exports.ForgotPasswordToken=ForgotPasswordToken;


  
