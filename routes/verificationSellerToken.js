const {VerificationSellerToken}=require('../models/verificationTokenSchema')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:tokenId',async (req, res) => {
  const verificationTokens = await VerificationSellerToken.findById(req.params.tokenId).select('email token creationDate expiryDate activated  -_id');;
  if (!verificationTokens) return res.status(404).send('The token with the given ID was not found.');

  res.send(verificationTokens);
});



module.exports = router;