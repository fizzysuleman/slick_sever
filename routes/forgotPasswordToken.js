const { ForgotPasswordToken } = require('../models/forgotPasswordTokenSchema')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

var now=new Date()

//getting the token details by the id and return the response to the server
router.post('/',async (req, res) => {
  const forgotPasswordToken = await ForgotPasswordToken.findOne({userId:req.body.userId,token:req.body.token})
  //.select('email token creationDate expiryDate activated  -_id');;
  if (!forgotPasswordToken){
    res.status(404).send('The token is incorrect');
  } 
  else if(forgotPasswordToken.expiryDate<now ||forgotPasswordToken.used){
      res.send('The token has expired or has been used before')
  } 
else{
  const token=forgotPasswordToken.generateAuthToken()

  res.send({
      token,
      userId:forgotPasswordToken.userId
    });
}
});



module.exports = router;