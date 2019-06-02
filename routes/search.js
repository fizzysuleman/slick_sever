const {RegisteredSeller}=require('../models/registerSellerModel')
const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/tags/:searchTerm',auth,async (req, res) => {

    var regex =new RegExp(req.params.searchTerm,'i')

    

  return Post.find({'$or':
  [{nameOfItem:regex},{hashTags:regex}]}
  ,function(err,q){
    res.send(q)
  })
  
})


router.get('/sellers/:searchTerm',auth,async (req, res) => {

  var regex =new RegExp(req.params.searchTerm,'i')

return RegisteredSeller.find({'$or':
[{brandName:regex},{firstName:regex},{lastName:regex}]}
,function(err,q){
  res.send(q)
})



})

router.get('/availableIn/:searchTerm/:searchLocation',auth,async (req, res) => {

  var regex =new RegExp(req.params.searchTerm,'i')
  var regexLocation =new RegExp('a','i')
  
 return Post.find({'$or':
  [{nameOfItem:regex},{hashTags:regex}]}
  ,function(err,tags){
    res.send(filter(tags,req.params.searchLocation))
  })

  function filter(q,letter){
    var filtered=q.filter(function(word){
      return word.location.toLowerCase().indexOf(letter.toLowerCase())>-1
    })
    return(filtered)
  }    

  

  })

  router.get('/availableInSchool/:searchTerm/:searchSchool',auth,async (req, res) => {

    var regex =new RegExp(req.params.searchTerm,'i')
    
   return Post.find({'$or':
    [{nameOfItem:regex},{hashTags:regex}]}
    ,function(err,tags){
      res.send(filter(tags,req.params.searchSchool))
    })
  
    function filter(q,letter){
      var filtered=q.filter(function(word){
        return word.school.toLowerCase().indexOf(letter.toLowerCase())>-1
      })
      return(filtered)
    }    
  
    
  
    })

module.exports = router;