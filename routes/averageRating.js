const {AverageRating}=require('../models/averageRatingSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')



router.get('/:sellerId',auth, async (req, res) => {
    let rating=await AverageRating.findOne({sellerId:req.params.sellerId})

   if(rating){
    let averageRating= rating.averageRating
    res.json({
        averageRating,
        ratingNumber:rating.numberOfRatings
    })
   }
   else{
    res.json({
        averageRating:0,
        ratingNumber:0
    })
   }
    
}) 



module.exports = router