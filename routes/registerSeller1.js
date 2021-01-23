const _=require('lodash')
const {VerificationBuyerToken,VerificationSellerToken,validate}=require('../models/verificationTokenSchema')
const {RegisteredBuyer} =require('../models/registerBuyerModel')
const {RegisteredSeller} =require('../models/registerSellerModel')
const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const {sendConfirmationToken}=require('../models/mailSender')
const { sendToken } = require('../models/messageSender')


const jwt=require('jsonwebtoken')

//generating a random 6 digits number
var token =  Math.floor(100000 + Math.random() * 900000)
var presentDate=new Date()

//saving the verfication token details 
router.post('/',async(req,res)=>{
    const {error}=validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    } 
//checking if the email is already present in the final registration or has already started the process before
    let validateEmail=await RegisteredSeller.findOne({email:req.body.email})
   let validateEmail2= await VerificationSellerToken.findOne({email:req.body.email})
   let validateEmail3=await VerificationBuyerToken.findOne({email:req.body.email})
   let validateEmail4=await RegisteredBuyer.findOne({email:req.body.email})

   //checking if the phone is already present in the final registration or has already started the process before
   let validatePhone=await RegisteredSeller.findOne({phone: req.body.phone})
   let validatePhone2= await VerificationSellerToken.findOne({phone: req.body.phone})
   let validatePhone3=await VerificationBuyerToken.findOne({phone: req.body.phone})
   let validatePhone4=await RegisteredBuyer.findOne({phone: req.body.phone})
   //if it is in the final registration send a message to the client with a status code of 400
   if (validateEmail || validatePhone) {
    return res.status(400).send('Email or Phone number already exist')
}
if (validateEmail4 || validatePhone4) {
    return res.status(400).send('Email or Phone number has already been registered by a buyer')

}
    if(validateEmail3){
        let id=await VerificationBuyerToken.findOne({email:req.body.email})
        let tokenId=id._id
        const test=await VerificationBuyerToken.findByIdAndDelete(tokenId)
    if(test){
        const verificationToken=new VerificationSellerToken({
            email: req.body.email,
            token:Math.floor(100000 + Math.random() * 900000),
            creationDate:Date(),
            expiryDate:presentDate.setDate(presentDate.getDate() + 1),
            activated: false,
    })
    
    
    const sentMail=await  sendConfirmationToken(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(error=>{res.send(error.message)})
    //const sentToken = await sendToken(req.body.phone, verificationToken.token, req.body.firstName, req.body.lastName).catch(error=>{res.send(error.message)})

    if(sentMail){
       await res.send(verificationToken._id)
       await verificationToken.save()

    }
    }
    }
//else if it has already started a registration but has not finished, update the details in the db
    else if(validateEmail2){
        let id=await VerificationSellerToken.findOne({email:req.body.email})
        let tokenId=id._id
        
        const verificationToken=await VerificationSellerToken.findById(tokenId)
        verificationToken.token=Math.floor(100000 + Math.random() * 900000)
        verificationToken.creationDate=Date()
        verificationToken.expiryDate=presentDate.setDate(presentDate.getDate() + 1)
        verificationToken.activated=false


        const sentMail=await  sendConfirmationToken(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(error=>{res.send(error.message)})
        //const sentToken = await sendToken(req.body.phone, verificationToken.token, req.body.firstName, req.body.lastName).catch(error=>{res.send(error.message)})

    if(sentMail){
        await res.send(verificationToken._id)
        await verificationToken.save()

    }
        
    }

    //else continue the process normally
    else{
        const verificationToken=new VerificationSellerToken({
            email: req.body.email,
            token:Math.floor(100000 + Math.random() * 900000),
            creationDate:Date(),
            expiryDate:presentDate.setDate(presentDate.getDate() + 1),
            activated: false,
    })
    
    
    const sentMail=await  sendConfirmationToken(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(error=>{res.send(error.message)})
    //const sentToken = await sendToken(req.body.email, verificationToken.token, req.body.firstName, req.body.lastName).catch(error=>{res.send(error.message)})

    if(sentMail){
       await res.send(verificationToken._id)
       await verificationToken.save()

    }
   
    
    }
    
})


module.exports=router