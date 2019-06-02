const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:brandId',auth,async (req, res) => {
  const sellerItems = await Post.find({brandId:req.params.brandId});
  
  res.send(sellerItems);
});



module.exports = router;