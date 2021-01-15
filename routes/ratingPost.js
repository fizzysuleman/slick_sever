const { Rating } = require('../models/ratingSchema')
const { AverageRating } = require('../models/averageRatingSchema')

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {

    //find the user rating
    let user = await Rating.findOne({ userId: req.body.userId, sellerId: req.body.sellerId })
    //find the seller rating average collection
    let sellerAverageRating = await AverageRating.findOne({ sellerId: req.body.sellerId })

    //if the user is present...
    if (user) {
        let userOldRating = user.rating
        let userNewRating = req.body.rating
        //let the newTotalRating be the former total rating-the user former rating+ plus the current rating assigned
        let newTotalRating = (sellerAverageRating.totalRating - userOldRating) + userNewRating
        let newAverageRating = newTotalRating / sellerAverageRating.numberOfRatings
        //in the rating collection update the particular rating for them    
        await Rating.updateOne({ _id: user._id }, {
            $set: {
                'rating': req.body.rating
            }
        })
        // console.log(sellerAverageRating.totalRating-userOldRating)
        //in the average rating collection update the values of the total rating and average rating
        await AverageRating.updateOne({ sellerId: req.body.sellerId }, {
            $set: {
                'totalRating': newTotalRating,
                'averageRating': newAverageRating
            }
        })


        res.send('Successfully updated rating')
    }
    else {
        //else if the user has not rated that particular seller before...create a new rating document
        const rating = await new Rating({
            userId: req.body.userId,
            sellerId: req.body.sellerId,
            rating: req.body.rating
        })
        await rating.save()

        //then if the seller rated does not have an average document ..create a new one for it
        if (!sellerAverageRating) {
            console.log(req.body.rating)
            const averageRatings = await new AverageRating({
                sellerId: req.body.sellerId,
                totalRating: req.body.rating,
                numberOfRatings: 1,
                averageRating: req.body.rating
            })
            await averageRatings.save()
            res.send('Successful rated this seller')

        }
        //else update the values in it
        else {
            let newTotalRating = sellerAverageRating.totalRating + req.body.rating
            let newNumberOfRatings = sellerAverageRating.numberOfRatings + 1
            let newAverageRating = newTotalRating / newNumberOfRatings

            await AverageRating.updateOne({ sellerId: req.body.sellerId }, {
                $set: {
                    'totalRating': newTotalRating,
                    'numberOfRatings': newNumberOfRatings,
                    'averageRating': newAverageRating
                }
            })
            res.send('Successful rated this seller')

        }
    }

})

router.get('/:userId/:sellerId', auth, async (req, res) => {
    try {
        let user = await Rating.findOne({ userId: req.params.userId, sellerId: req.params.sellerId })

        if (!user) {
            return res.status(404).send('This user has not rated this Brand');
        }
        else {
            res.json({ rating: user.rating })
        }
    }
    catch (ex) {
        res.status(500).send('Something failed from the server.')
    }
})





module.exports = router