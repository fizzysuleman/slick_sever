const {RegisteredBuyer}=require('../models/registerBuyerModel')
const {RegisteredSeller}=require('../models/registerSellerModel')
const {Post}=require('../models/postSchema')

const Joi=require('joi')
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/buyer', auth, async (req, res) => {
    const {error}=validateBuyer(req.body);
    let person = await RegisteredBuyer.findOne({username:{$regex:`^${req.body.username}$`,$options:'i'}})
    let person2 = await RegisteredSeller.findOne({brandName:{$regex:`^${req.body.username}$`,$options:'i'}})
    if(error){
        return res.status(400).send(error.details[0].message)
    
    }
    else{

    if(person &&(person._id!=req.body.userId)){
        res.status(400).send('The Username has already been taken')
    }
    else if(person2){
        res.status(400).send('A seller already has this Username as their Brandname')
    }
    else{
    let updateBuyer = await RegisteredBuyer.findOneAndReplace({_id:req.body.userId},
        {
            $set:
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                username:req.body.username,
                email:req.body.email,
                homeAddress:req.body.homeAddress,
                phone:req.body.phone            }
        })

    if (updateBuyer) {
        res.send('Profile Updated')
    }
    else {
        res.send('Profile not Updated')
    }

    }
}
})


router.put('/seller', auth, async (req, res) => {
    const {error}=validateSeller(req.body);

    let person = await RegisteredSeller.findOne({brandName:{$regex:`^${req.body.brandName}$`,$options:'i'}})
    let person2 = await RegisteredBuyer.findOne({username:{$regex:`^${req.body.brandName}$`,$options:'i'}})

    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    else{

        if(person &&(person._id!=req.body.userId)){
            res.status(400).send('The Brandname has already been taken')
        }
        else if(person2){
            res.status(400).send('A buyer already entered the Brandname as their username')

        }
        else{
    let updateBuyer = await RegisteredSeller.findOneAndReplace({_id:req.body.userId},
        {
            $set:
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                brandName:req.body.brandName,
                email:req.body.email,
                homeAddress:req.body.homeAddress,
                phone:req.body.phone,
                location:req.body.location,
                sells:req.body.sells,
                website:req.body.website,
                imageUrl:req.body.imageUrl
            }
        })
    //update brandName in posts
    let updateSellersPost=await Post.find({brandId:req.body.userId}).updateMany({$set:
        {
            brandName:req.body.brandName
        }})
        
       

    if (updateBuyer&&updateSellersPost) {
        res.send('Profile Updated')
    }
    else {
        res.send('Profile not Updated')
    }
        }
    }

})



function validateBuyer(user) {
    const schema = {
      firstName: Joi.string().min(1).max(50).required(),
      lastName:Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email().required(),
      phone:Joi.string().required(),
      username:Joi.string().min(4).max(10),
      homeAddress:Joi.string().min(5).max(2024),
      userId:Joi.string().required(),
    
    };
  
    return Joi.validate(user, schema);
  }

  function validateSeller(user) {
    const schema = {
      firstName: Joi.string().min(1).max(50).required(),
      lastName:Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email().required(),
      phone:Joi.string().required(),
      brandName:Joi.string().min(4).max(15).required(),
      homeAddress:Joi.string().min(5).max(2024).required(),
      location:Joi.string().min(1).max(30).allow('').optional(),
      sells:Joi.string().min(3).max(30).allow('').optional(),
      website:Joi.string().min(3).max(200).allow('').optional(),
      userId:Joi.string().required(),
      imageUrl:Joi.string()


    };
  
    return Joi.validate(user, schema);
  }



module.exports = router;