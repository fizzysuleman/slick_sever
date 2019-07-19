const _ = require('lodash')
const { ForgotPasswordToken } = require('../models/forgotPasswordTokenSchema')
const { RegisteredBuyer } = require('../models/registerBuyerModel')
const { RegisteredSeller } = require('../models/registerSellerModel')
const express = require('express')
const router = express.Router()
const { forgotPasswordMailer } = require('../models/mailer')

//generating a random 6 digits number
var presentDate = new Date()

//saving the verfication token details 
router.post('/buyer', async (req, res) => {

    //checking if the email is already present in the final registration or has already started the process before
    let validUsername = await RegisteredBuyer.findOne({ username: req.body.username })
    let alreadyInToken = await ForgotPasswordToken.findOne({ username: req.body.username })


    

    //else if it has already started a registration but has not finished, update the details in the db
    if (alreadyInToken && validUsername) {
        let tokenId=alreadyInToken._id
        const deleted=await ForgotPasswordToken.findByIdAndDelete(tokenId)

        if(deleted){
            const forgotPasswordToken = await new ForgotPasswordToken({
                token: Math.floor(10000000 + Math.random() * 90000000),
                creationDate: Date(),
                expiryDate: presentDate.setDate(presentDate.getDate() + 1),
                used: false,
                email: validUsername.email,
                userId: validUsername._id,
                username: req.body.username
            })
    
            const saved = await forgotPasswordToken.save()
    
            if (saved) {
                const sentMail = await forgotPasswordMailer(validUsername.email, req.body.username, forgotPasswordToken.token).catch(console.error)
    
                if (sentMail) {
                    await res.send(validUsername._id)
    
                }
            }
        }
    }
    else if(validUsername){
        const forgotPasswordToken = await new ForgotPasswordToken({
            token: Math.floor(10000000 + Math.random() * 90000000),
            creationDate: Date(),
            expiryDate: presentDate.setDate(presentDate.getDate() + 1),
            used: false,
            email: validUsername.email,
            userId: validUsername._id,
            username: req.body.username
        })

        const saved = await forgotPasswordToken.save()

        if (saved) {
            const sentMail = await forgotPasswordMailer(validUsername.email, req.body.username, forgotPasswordToken.token).catch(console.error)

            if (sentMail) {
                await res.send(validUsername._id)

            }
        }
    }
//else send not found
    else {
        res.status(400).send('Username does not exist')
    }

})







router.post('/seller', async (req, res) => {

    //checking if the email is already present in the final registration or has already started the process before
    let validBrandname = await RegisteredSeller.findOne({ brandName: req.body.brandName })
    let alreadyInToken = await ForgotPasswordToken.findOne({ username: req.body.brandName })


    
    //else if it has already started a registration but has not finished, update the details in the db
    if (alreadyInToken && validBrandname) {
        let tokenId=alreadyInToken._id
        const deleted=await ForgotPasswordToken.findByIdAndDelete(tokenId)

        if(deleted){
            const forgotPasswordToken = await new ForgotPasswordToken({
                token: Math.floor(10000000 + Math.random() * 90000000),
                creationDate: Date(),
                expiryDate: presentDate.setDate(presentDate.getDate() + 1),
                used: false,
                email: validBrandname.email,
                userId: validBrandname._id,
                username: req.body.brandName
            })
    
            const saved = await forgotPasswordToken.save()
    
            if (saved) {
                const sentMail = await forgotPasswordMailer(validBrandname.email, req.body.brandName, forgotPasswordToken.token).catch(console.error)
    
                if (sentMail) {
                    await res.send(validBrandname._id)
    
                }
            }
        }
    }
    else if(validBrandname){
        const forgotPasswordToken = await new ForgotPasswordToken({
            token: Math.floor(10000000 + Math.random() * 90000000),
            creationDate: Date(),
            expiryDate: presentDate.setDate(presentDate.getDate() + 1),
            used: false,
            email: validBrandname.email,
            userId: validBrandname._id,
            username: req.body.brandName
        })

        const saved = await forgotPasswordToken.save()

        if (saved) {
            const sentMail = await forgotPasswordMailer(validBrandname.email, req.body.brandName, forgotPasswordToken.token).catch(console.error)

            if (sentMail) {
                await res.send(validBrandname._id)

            }
        }
    }
//else send not found
    else {
        res.status(400).send('Username does not exist')
    }

})

module.exports = router