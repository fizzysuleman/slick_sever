const {WishList}=require('../models/wishListSchema')
const {Post}=require('../models/postSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

    let user =await WishList.findOne({userId:req.body.userId})
    let post= await Post.findOne({_id:req.body.postId})
    if(user){ 
        if(!user.postIds.includes(req.body.postId)){
            res.send('Item not present')
        }
        else{
            await user.postIds.pull(req.body.postId)
            user.save()
            await post.addedToWishList.pull(req.body.userId)
            post.save()
            res.send('Removed')
        }
    }
    else{
        res.send('Wishlist is empty')
    }
   

})


module.exports = router
