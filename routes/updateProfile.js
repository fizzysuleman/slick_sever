const {RegisteredBuyer}=require('../models/registerBuyerModel')
const {RegisteredSeller}=require('../models/registerSellerModel')
const Joi=require('joi')
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/buyer', auth, async (req, res) => {
    const {error}=validateBuyer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let updateBuyer = await RegisteredBuyer.findOneAndReplace({_id:req.body.userId},
        {
            $set:
            {
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                username:req.body.username,
                email:req.body.email,
                homeAddress:req.body.homeAddress,
                phone:req.body.phone,
                imageUrl:req.body.imageUrl
            }
        })

    if (updateBuyer) {
        res.send('Profile Updated')
    }
    else {
        res.send('Profile not Updated')
    }


})


router.put('/seller', auth, async (req, res) => {
    const {error}=validateSeller(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
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

    if (updateBuyer) {
        res.send('Profile Updated')
    }
    else {
        res.send('Profile not Updated')
    }


})



function validateBuyer(user) {
    const schema = {
      firstName: Joi.string().min(1).max(50).required(),
      lastName:Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email().required(),
      phone:Joi.number().required(),
      username:Joi.string().min(1).max(20),
      homeAddress:Joi.string().min(5).max(2024),
      userId:Joi.string().required(),
    imageUrl:Joi.string()
    };
  
    return Joi.validate(user, schema);
  }

  function validateSeller(user) {
    const schema = {
      firstName: Joi.string().min(1).max(50).required(),
      lastName:Joi.string().min(1).max(50).required(),
      email: Joi.string().min(5).max(255).required().email().required(),
      phone:Joi.number().required(),
      brandName:Joi.string().min(1).max(50).required(),
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