const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.put('/',auth,async (req, res) => {
  let deleted = await Post.findOneAndReplace({_id:req.body.postId}, { $set: { deleted:true }})

  if(deleted){
      res.send('De1eted post')
  }
  else{
      res.send('Not deleted')
  }
  
    
})



module.exports = router;