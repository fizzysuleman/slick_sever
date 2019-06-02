const {Cart}=require('../models/cartSchema')
const {Post}=require('../models/postSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

    let user =await Cart.findOne({userId:req.body.userId})
    let post= await Post.findOne({_id:req.body.postId})
    if(user){ 
        if(!user.postIds.includes(req.body.postId)){
            res.send('Item not present')
        }
        else{
            await user.postIds.pull(req.body.postId)
            user.save()
            await post.addedToCart.pull(req.body.userId)
            post.save()
            res.send('Removed')
        }
    }
    else{
        res.send('Cart is empty')
    }
   

})


module.exports = router
