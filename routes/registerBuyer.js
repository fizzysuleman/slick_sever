const _=require('lodash')
const {RegisteredBuyer,validate}=require('../models/registerBuyerModel')
const {RegisteredSeller}=require('../models/registerSellerModel')
const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const jwt=require('jsonwebtoken')
const {successful}=require('../models/mailer')
const {VerificationBuyerToken}=require('../models/verificationTokenSchema')


//registering a user
router.post('/',async(req,res)=>{
    const {error}=validate(req.body)
    //using the joi validation to send error
    if(error){
        return res.status(400).send(error.details[0].message);
    } 
//checking if there is any exisiting username / email with the one the user entered
    let validateBuyerEmail=await RegisteredBuyer.findOne({email:req.body.email})
    let validateSellerEmail=await RegisteredSeller.findOne({email:req.body.email})
    let validateUsername=await RegisteredBuyer.findOne({username:req.body.username})
    let validateBrandname=await RegisteredSeller.findOne({brandName:req.body.username})
//if the username or email exist send a message with a status code 400
    if(validateUsername){
        return  res.status(400).send('Username is already exists')
    }
    if(validateBuyerEmail){
        return res.status(400).send('Email already exist')
    }
    if(validateSellerEmail){
        return res.status(400).send('A seller has already used this email to register')
    }
    if(validateBrandname){
        return res.status(400).send('The username you entered is already used by a send as the brand name')
    }
    //checking if the password is the same with the confirm password
    else if(req.body.password !== req.body.confirmPassword){
        return res.status(400).send('Confirm password is different from password')
    }

    //putting the values into the model
    let buyers=new RegisteredBuyer({
        imageUrl:'',
        firstName: req.body.firstName,
      lastName:req.body.lastName,
      username:req.body.username,
      email: req.body.email,
      phone:req.body.phone,
    password:req.body.password,
    //   confirmPassword:req.body.confirmPassword,
      dateOfBirth:req.body.dateOfBirth,
      homeAddress:req.body.homeAddress,
     terms:req.body.terms,
     typeOfAccount:'buyer',
     allowed:true,
     dateOfRegistration:Date()
    })
//hashing the password
    const salt=await bcrypt.genSalt(10)
    buyers.password=await bcrypt.hash(buyers.password,salt)
    // buyers.confirmPassword=await bcrypt.hash(buyers.confirmPassword,salt)

    //save the user after hashing
    buyers=await buyers.save()
  
    


if(buyers){
    //if the user sucessfully saved then change the status of the activated account to true
    const verificationToken=await VerificationBuyerToken.findById(req.body.tokenId)
    verificationToken.activated=true

    await verificationToken.save()
    //then send the successfully registered mail to the client mail
         const successfulMail=await  successful(req.body.email,req.body.firstName,req.body.lastName).catch(console.error)
if(successfulMail){
//if it sent then send a response to the client side with the token to continue    
    const token=buyers.generateAuthToken()
    res.json({
        token:token,
        userId:buyers._id,
        account:buyers.typeOfAccount,
        username:buyers.username,
        fullName:buyers.firstName +' '+buyers.lastName
    })
}
        }
    



})





module.exports=router
