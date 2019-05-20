const {RegisteredSeller}=require('../models/registerSellerModel')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/',auth,async (req, res) => {
  const sellerPost = await RegisteredSeller.find().select('posts -_id');
  if (!sellerPost) return res.status(404).send('Account Info not found');

  res.send(sellerPost);

  
})



module.exports = router;