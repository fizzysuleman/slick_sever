const {RegisteredSeller}=require('../models/registerSellerModel')
const {RegisteredBuyer}=require('../models/registerBuyerModel')

const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:id',auth,async (req, res) => {
  const seller = await RegisteredSeller.findById(req.params.id);
  const buyer = await RegisteredBuyer.findById(req.params.id);

  if (seller){
      let sellerCart=seller.cart
      let sellerWishList=seller.wishList

     return res.json({
        cart:sellerCart,
        wishList:sellerWishList
      })
  }
  else if (buyer){
    let buyerCart=buyer.cart
    let buyerWishList=buyer.wishList

   return res.json({
      cart:buyerCart,
      wishList:buyerWishList
    })
  }
  else{
    return res.status(404).send('Account Info not found');

  }
  
  

   
});



module.exports = router;