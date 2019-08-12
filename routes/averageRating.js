const { AverageRating } = require('../models/averageRatingSchema')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')



router.get('/:sellerId', auth, async (req, res) => {
    AverageRating.findOne({ sellerId: req.params.sellerId })
    .then(rating => {
        if (rating) {
            let averageRating = rating.averageRating
            res.json({
                averageRating,
                ratingNumber: rating.numberOfRatings
            })
        }
        else {
            res.json({
                averageRating: 0,
                ratingNumber: 0
            })
        }
    })
        .catch(err => {
            // When the ID isn't valid, it shows up as an error
            res.status(404).send(err.message)
        })



})



module.exports = router