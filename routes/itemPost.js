const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/:postId',auth,async(req, res) => {
  try{
Post.findById(req.params.postId)
.then(result => {
  res.send(result)
})
.catch(err => {
  // When the ID isn't valid, it shows up as an error
  res.status(404).send(err.message)
})
}
catch (ex) {
   res.status(500).send('Something failed from the server.')
}

});



module.exports = router;