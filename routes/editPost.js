const { Post } = require('../models/postSchema')
const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/', auth, async (req, res) => {
    let update = await Post.findOneAndReplace({_id:req.body.postId},
        {
            $set:
            {
                nameOfItem:req.body.nameOfItem,
                price:req.body.price,
                hashTags:req.body.hashTags,
                colorAvailable:req.body.colorAvailable,
                sizeAvailable:req.body.sizeAvailable,
                location:req.body.location,
                category:req.body.category,
                school:req.body.school,
            }
        })

    if (update) {
        res.send('Updated post')
    }
    else {
        res.send('Not update')
    }


})



module.exports = router;