const _=require('lodash')
const {RegisteredSeller,validate}=require('../models/registerSellerModel')
const {RegisteredBuyer}=require('../models/registerBuyerModel')
const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const jwt=require('jsonwebtoken')
const {successful}=require('../models/mailer')
const {VerificationSellerToken}=require('../models/verificationTokenSchema')


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
let validateUsername=await RegisteredBuyer.findOne({username:req.body.brandName})
let validateBrandname=await RegisteredSeller.findOne({brandName:req.body.brandName})
//if the username or email exist send a message with a status code 400
if(validateUsername){
    return  res.status(400).send('The brand name is used by a buyer as username')
}
if(validateBuyerEmail){
    return res.status(400).send('The email you entered is used by a buyer')
}
if(validateSellerEmail){
    return res.status(400).send('Email already exist')
}
if(validateBrandname){
    return res.status(400).send('Brand nanme already exist')
}
//checking if the password is the same with the confirm password
    else if(req.body.password !== req.body.confirmPassword){
        return res.status(400).send('Confirm password is different from password')
    }

    //putting the values into the model
    let sellers=new RegisteredSeller({
        imageUrl:'',
        firstName: req.body.firstName,
      lastName:req.body.lastName,
      brandName:req.body.brandName,
      email: req.body.email,
      phone:req.body.phone,
    password:req.body.password,
    //   confirmPassword:req.body.confirmPassword,
      dateOfBirth:req.body.dateOfBirth,
      homeAddress:req.body.homeAddress,
      location:req.body.location,
      school:req.body.school,
      sells:req.body.sells,
      website:req.body.website,
     terms:req.body.terms,
     typeOfAccount:'seller',
     allowed:true,
     dateOfRegistration:Date()
    })
//hashing the password
    const salt=await bcrypt.genSalt(10)
    sellers.password=await bcrypt.hash(sellers.password,salt)
    // sellers.confirmPassword=await bcrypt.hash(sellers.confirmPassword,salt)

    //save the user after hashing
    const successfulMail=await  successful(req.body.email,req.body.firstName,req.body.lastName).catch(console.error)

    


if(successfulMail){
    //if the user sucessfully saved then change the status of the activated account to true
    const verificationToken=await VerificationSellerToken.findById(req.body.tokenId)
    verificationToken.activated=true

    await verificationToken.save()
    sellers=await sellers.save()

    //then send the successfully registered mail to the client mail
if(sellers){
//if it sent then send a response to the client side with the token to continue    
    const token=sellers.generateAuthToken()
    res.json({
        token:token,
        userId:sellers._id,
        account:sellers.typeOfAccount,
        username:sellers.brandName,
        fullName:sellers.firstName +' '+sellers.lastName
    })
}
        
}
    



})





module.exports=router
