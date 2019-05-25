const {RegisteredSeller}=require('../models/registerSellerModel')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:sellerId/:postId',auth,async (req, res) => {
  const seller = await RegisteredSeller.findById(req.params.sellerId);
  let post=seller.posts.id(req.params.postId)

let addedToWishList=post.addedToWishList
let addedToCart=post.addedToCart  
  res.json({
    addedToCart:addedToCart,
    addedToWishList:addedToWishList
  })
});



module.exports = router;