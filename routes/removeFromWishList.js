const { RegisteredSeller, WishList,validatePost,Post } = require('../models/registerSellerModel')
const {RegisteredBuyer}=require('../models/registerBuyerModel')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 
try {
    const seller =await RegisteredSeller.findById(req.body.sellerId)

//the particular post out of all the post the seller has, find it by its id
let post=seller.posts.id(req.body.postId)
   
    
//find the userId to push the post to the wishList

const userSeller = await RegisteredSeller.findById(req.body.userId)
const userBuyer=await RegisteredBuyer.findById(req.body.userId)

if(userSeller){
   
    await userSeller.wishList.remove(post)
    
    let saved=userSeller.save()
    if(saved){
        //post.addedToWishList.push()
        await post.addedToWishList.pull(req.body.userId)


        //post.update({ $pull: {addedToWishList: req.body.id } } )        
        seller.save()
        res.send(post.addedToWishList)

    }

}
else if(userBuyer){
    await userBuyer.wishList.push(wishList)
    let saved=userBuyer.save()
    if(saved){
        await post.addedToWishList.pull(req.body.userId)


        seller.save()
        res.send(post.addedToWishList)

    }
}
else{
    res.send('User not found').status(404)
}
    
} catch (error) {
 console.log('error',error)
}
    //the seller of the product find is by its id


    

})


module.exports = router
