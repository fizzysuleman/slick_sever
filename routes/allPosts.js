const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/',auth,async (req, res) => {

  let page=req.query.page
  let pageSize=req.query.pageSize
  pageSize=parseInt(pageSize)

  var regex =new RegExp(req.query.category,'i')

  let sellerPost = await Post.find(
    {'$or':
  [{category:regex,deleted:false,blocked:false}]
}
   
  ).skip(page*pageSize).limit(pageSize).sort({'creationTime':-1})
 
  

  res.send(sellerPost);

  
})



module.exports = router;