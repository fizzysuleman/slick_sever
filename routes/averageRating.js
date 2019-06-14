const {AverageRating}=require('../models/averageRatingSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')



router.get('/:sellerId',auth, async (req, res) => {
    let rating=await AverageRating.findOne({sellerId:req.params.sellerId})

    let averageRating= rating.averageRating
   
    res.json({
        averageRating,
        ratingNumber:rating.numberOfRatings
    })
}) 



module.exports = router