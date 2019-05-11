const _=require('lodash')
const config=require('config')
const Joi=require('joi')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {RegisteredSeller} = require('../models/registerSellerModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let user=await RegisteredSeller.findOne({brandName:req.body.brandName})

    if(!user){
        return res.status(400).send('Invalid brand name or password')
    }
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword){
        return res.status(400).send('Invalid brand name or password')
    }
    else if(!user.allowed){
        return res.status(401).send('You have been blocked by the administrator')
    }

    const token=user.generateAuthToken()
    res.json({
        token:token,
        userId:user._id
    })

})

function validate(req) {
    const schema = {
      brandName: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(2024).required()
  
    };
  
    return Joi.validate(req, schema);
  }

  module.exports=router