const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:postId',auth,async(req, res) => {
  const post= await Post.findById(req.params.postId)


  res.send(post)
});



module.exports = router;