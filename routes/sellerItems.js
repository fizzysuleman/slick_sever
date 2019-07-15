const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:brandId',auth,async (req, res) => {
  let page=req.query.page
  let pageSize=req.query.pageSize
  pageSize=parseInt(pageSize)


  let sellerItems = await Post.find(
    {'$or':
  [{brandId:req.params.brandId,deleted:false}]
}).skip(page*pageSize).limit(pageSize).sort({'creationTime':-1})
  
  
  res.send(sellerItems);
});



module.exports = router;