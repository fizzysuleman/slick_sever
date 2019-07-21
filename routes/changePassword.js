const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const {RegisteredBuyer,validate}=require('../models/registerBuyerModel')
const {RegisteredSeller}=require('../models/registerSellerModel')
const bcrypt=require('bcrypt')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/',auth,async (req, res) => {

    let buyer=await RegisteredBuyer.findOne({_id:req.body.userId})
    let seller=await RegisteredSeller.findOne({_id:req.body.userId})

     if(buyer){
        let buyerPassword=buyer.password
        const validOldPassword=await bcrypt.compare(req.body.password,buyerPassword)
        
        if(validOldPassword){
            if(req.body.currentPassword==req.body.currentConfirmPassword){
                //hashing the password
                const salt=await bcrypt.genSalt(10)
                let hashedCurrentPassword=await bcrypt.hash(req.body.currentPassword,salt)

                let changePassword=await RegisteredBuyer.findOneAndReplace({_id:req.body.userId}, { $set: { password:hashedCurrentPassword }})
                if(changePassword){
                    res.send('Password has been successfully changed')
                }
            }
            else{
                res.send('The passwords dont match,Try again')
            }

        }
        else{
            res.send('The old password entered was not correct')
        }
    }
    else if(seller){
        let sellerPassword=seller.password
        const validOldPassword=await bcrypt.compare(req.body.password,sellerPassword)
        
        if(validOldPassword){
            if(req.body.currentPassword==req.body.currentConfirmPassword){
                //hashing the password
                const salt=await bcrypt.genSalt(10)
                let hashedCurrentPassword=await bcrypt.hash(req.body.currentPassword,salt)

                let changePassword=await RegisteredSeller.findOneAndReplace({_id:req.body.userId}, { $set: { password:hashedCurrentPassword }})
                if(changePassword){
                    res.send('Password has been successfully changed')
                }
            }
            else{
                res.send('The passwords dont match,Try again')
            }

        }
        else{
            res.send('The old password entered was not correct')
        }
    }
    else{
        res.send('User not found')
    }  
    
})



module.exports = router;