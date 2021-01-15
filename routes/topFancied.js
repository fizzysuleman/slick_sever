const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/',auth,async (req, res) => {
  try{
  let post = await Post.find()
  if (!post) return res.status(404).send('There is no present post');

  

  post=await post.filter((item)=>{
    return (item.deleted|| item.blocked) !== true 
  })
  post=await post.sort(function (a, b) {
    return b.addedToWishList.length - a.addedToWishList.length;
  });

 
  topPost=await post.slice(0,10).map(i => {
    return i
})

  res.send(topPost);
}
catch (ex) {
   res.status(500).send('Something failed from the server.')
}
  
})



module.exports = router;