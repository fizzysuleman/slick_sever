const {Cart}=require('../models/cartSchema')
const {Post}=require('../models/postSchema')
const express = require('express');
const mongoose=require('mongoose')
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:id',auth,async (req, res) => {
    let user =await Cart.findOne({userId:req.params.id})

    if(user){
 let userCartIds=user.postIds
   let userCart = await Post.find(
    {_id:
        userCartIds.map((item,index)=>{
           return mongoose.Types.ObjectId(item)

        })

}
   )
   userCart=userCart.filter((item)=>{
      return (item.deleted|| item.blocked) !== true 
    })
res.send(userCart)
   }
   else {
      res.send([])
   }
});




module.exports = router;