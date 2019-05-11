const mongoose=require('mongoose')
const Joi = require('joi');
const config=require('config')
const jwt=require('jsonwebtoken')

//Schema for the whole registeration of buyers

const registerSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
      },
      lastName:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
      },
      brandName:{
        type: String,
        //required: true,
        minlength: 1,
        maxlength: 50
      },
      password: {
        type: String,
        //required: true,
        minlength: 5,
        maxlength: 1024,
       },
      confirmPassword: {
        type: String,
        //required: true,
        minlength: 5,
        maxlength: 1024,
        },
    dateOfBirth:{
        type:String,
        //required:true
    },
    homeAddress:{
        type:String,
        //required:true,
        minlength: 5,
        maxlength: 2024,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true
      },
      phoneNumber:{
          type:Number,
          
      },
      location:{
        type:String,
      },
      school:{
        type:String,
      },
      sells:{
        type:String
      },
      website:{
        type:String
      },
      terms:{
          type:Boolean,
          //required:true
      },
      typeOfAccount:{
          type:String
      },
      allowed:{
          type:Boolean
      },
      dateOfRegistration:{
        type:Date
      }
})


//generating a jwt if the registartion is successful
registerSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,typeOfAccount:this.typeOfAccount},config.get('jwtPrivateKey'))
    return token
  }

  //connecting the model with the schema
const Sellers=mongoose.model('Sellers',registerSchema)


//joi validation for the user
function validateUser(user) {
    const schema = {
      firstName: Joi.string().min(1).max(50).required(),
      lastName:Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email().required(),
      phone:Joi.number().required(),
      brandName:Joi.string().min(1).max(50),
      password: Joi.string().min(5).max(1024),
      confirmPassword: Joi.string().min(5).max(1024),
      dateOfBirth:Joi.string(),
      homeAddress:Joi.string().min(5).max(2024),
      terms:Joi.boolean(),
      location:Joi.string().min(1).max(30),
      sells:Joi.string().min(3).max(30),
      website:Joi.string().min(3).max(200),
      tokenId:Joi.string().required()
    };
  
    return Joi.validate(user, schema);
  }

  exports.RegisteredSeller=Sellers;
  exports.validate=validateUser
  
