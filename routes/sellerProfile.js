const {RegisteredSeller}=require('../models/registerSellerModel')
const mongoose = require('mongoose');
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:id',auth,async (req, res) => {
  try{
  const seller = await RegisteredSeller.findById(req.params.id);
  if (!seller) return res.status(404).send('Account Info not found');

 
  let sellerProfile=seller.toJSON()
  delete sellerProfile.password
  delete sellerProfile.confirmPassword

  res.send(sellerProfile);
}
catch (ex) {
   res.status(500).send('Something failed from the server.')
}
});



module.exports = router;