const {RegisteredBuyer}=require('../models/registerBuyerModel')
const mongoose = require('mongoose');
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:id',auth,async (req, res) => {
  try{
  const buyer = await RegisteredBuyer.findById(req.params.id);
  if (!buyer) return res.status(404).send('Account Info not found');

 
  let buyerProfile=buyer.toJSON()
  delete buyerProfile.password
  delete buyerProfile.confirmPassword
  delete buyerProfile.dateOfRegistration


  res.send(buyerProfile);
}
catch(ex){
  res.status(500).send('Something failed from the server.')
}
});



module.exports = router;