const { RegisteredSeller, Post,validatePost } = require('../models/registerSellerModel')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => {
    const {error}=validatePost(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    } 

    const user = await RegisteredSeller.findById(req.body.userId)

    let post= await new Post({
        nameOfItem:req.body.nameOfItem,
        price: req.body.price,
        hashTags: req.body.hashTags,
        colorAvailable: req.body.colors,
        sizeAvailable: req.body.sizes,
        location: req.body.location,
        category:req.body.category,
        school: req.body.school,
        addedToWishList: 0,
        paidForByCard: 0,
        blocked: false,
        imageUrl: req.body.imageUrl,
        creationTime:Date()
    })

    await user.posts.push(post)

    user.save()
    res.send(user)

})

async function updateAuthor(post){
    const user = await RegisteredSeller.findById('5cd81f8451bf0c2948fb8ef5')

    await user.posts.push(post)
   
    console.log(user)
}
//updateAuthor([new Post({nameOfItem:'Jog'}),new Post({nameOfItem:'Jo'})])

module.exports = router
