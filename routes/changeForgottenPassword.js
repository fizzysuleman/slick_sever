const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const {RegisteredBuyer,validate}=require('../models/registerBuyerModel')
const {RegisteredSeller}=require('../models/registerSellerModel')
const { ForgotPasswordToken } = require('../models/forgotPasswordTokenSchema')
const bcrypt=require('bcrypt')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/',auth,async (req, res) => {

    let buyer=await RegisteredBuyer.findOne({_id:req.body.userId})
    let seller=await RegisteredSeller.findOne({_id:req.body.userId})

    if(buyer){
        if(req.body.newPassword==req.body.confirmNewPassword){
            //hashing the password
            const salt=await bcrypt.genSalt(10)
            let hashedNewPassword=await bcrypt.hash(req.body.newPassword,salt)

            let changePassword=await RegisteredBuyer.findOneAndReplace({_id:req.body.userId}, { $set: { password:hashedNewPassword }})
            if(changePassword){
                const forgotPasswordToken = await ForgotPasswordToken.findOneAndRemove({userId:req.body.userId})
                res.send('Password has been successfully changed')
                
            }
        }
        else{
            res.send('The passwords dont match,Try again')
        }
    }
    else if(seller){
       
    }
    else{
        res.status(404).send('User not found')
    }  
    
})



module.exports = router;