const { RegisteredSeller} = require('../models/registerSellerModel')
const { Post,validatePost}=require('../models/postSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => {
    const {error}=validatePost(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    } 

    const user = await RegisteredSeller.findById(req.body.brandId)
    const brandName=await user.brandName


    let post= await new Post({
        nameOfItem:req.body.nameOfItem,
        price: req.body.price,
        hashTags: req.body.hashTags,
        colorAvailable: req.body.colors,
        sizeAvailable: req.body.sizes,
        location: req.body.location,
        category:req.body.category,
        school: req.body.school,
        addedToWishList: [],
        addedToCart:[],
        paidForByCard: [],
        blocked: false,
        deleted:false,
        imageUrl: req.body.imageUrl,
        creationTime:Date(),
        brandName:brandName,
        brandId:req.body.brandId,
        negotiable:req.body.negotiable
    })

    await post.save()

    res.send(post)

})


module.exports = router
