const _=require('lodash')
const {VerificationBuyerToken,VerificationSellerToken,validate}=require('../models/verificationTokenSchema')
const {RegisteredBuyer} =require('../models/registerBuyerModel')
const {RegisteredSeller} =require('../models/registerSellerModel')
const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const {mailer}=require('../models/mailer')
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
    let validateEmail=await RegisteredBuyer.findOne({email:req.body.email})
   let validateEmail2= await VerificationBuyerToken.findOne({email:req.body.email})
    let validateEmail3=await VerificationSellerToken.findOne({email:req.body.email})
   let validateEmail4=await RegisteredSeller.findOne({email:req.body.email})
//if it is in the final registration send a message to the client with a status code of 400
    if(validateEmail){
        return res.status(400).send('Email already exist')
    }
    if(validateEmail4){
        return res.status(400).send('Email has already been registered by a seller')

    }
    if(validateEmail3){
        let id=await VerificationSellerToken.findOne({email:req.body.email})
        let tokenId=id._id
        const test=await VerificationSellerToken.findByIdAndDelete(tokenId)
    if(test){
        const verificationToken=new VerificationBuyerToken({
            email: req.body.email,
            token:token,
            creationDate:Date(),
            expiryDate:presentDate.setDate(presentDate.getDate() + 1),
            activated: false,
    })
    
    
    const sentMail= await mailer(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(console.error)
    
    if(sentMail){
       await res.send(verificationToken._id)
       await verificationToken.save()

    }
    }
    }
//else if it has already started a registration but has not finished, update the details in the db
    else if(validateEmail2){
        let id=await VerificationBuyerToken.findOne({email:req.body.email})
        let tokenId=id._id
        
        const verificationToken=await VerificationBuyerToken.findById(tokenId)
        verificationToken.token=token
        verificationToken.creationDate=Date()
        verificationToken.expiryDate=presentDate.setDate(presentDate.getDate() + 1)
        verificationToken.activated=false


         const sentMail=await  mailer(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(console.error)
    
    if(sentMail){
        await res.send(verificationToken._id)
        await verificationToken.save()

    }
        
    }

    //else continue the process normally
    else{
        const verificationToken=new VerificationBuyerToken({
            email: req.body.email,
            token:Math.floor(100000 + Math.random() * 900000),
            creationDate:Date(),
            expiryDate:presentDate.setDate(presentDate.getDate() + 1),
            activated: false,
    })
    
    
    const sentMail= await mailer(req.body.email,verificationToken.token,req.body.firstName,req.body.lastName).catch(console.error)
    
    if(sentMail){
       await res.send(verificationToken._id)
       await verificationToken.save()

    }
   
    
    }
    
})


module.exports=router