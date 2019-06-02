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
            await user.postIds.push(req.body.postId)
            user.save()
            await post.addedToCart.push(req.body.userId)
            post.save()
            res.send('updated')
        }
        else{
            res.send('item already present')
        }
    }
    else{
        const cart= await new Cart({
            userId:req.body.userId,
            postIds:[req.body.postId]
        })
        await cart.save()
        await post.addedToCart.push(req.body.userId)
        post.save()
        res.send(cart)
    }

})


module.exports = router