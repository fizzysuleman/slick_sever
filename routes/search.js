const {RegisteredSeller}=require('../models/registerSellerModel')
const {Post}=require('../models/postSchema')
const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();


//getting the token details by the id and return the response to the server
router.get('/tags',auth,async (req, res) => {

    var regex =new RegExp(req.query.searchTerm,'i')

    

  return Post.find({'$or':
  [{nameOfItem:regex},{hashTags:regex}]}
  ,async function(err,q){
    let tag=q.filter((item)=>{
      return (item.deleted|| item.blocked) !== true 
    })
   
   tag=tag.map((item)=>{
      
        return ({
          _id:item["_id"],
          imageUrl:item["imageUrl"],
          nameOfItem:item["nameOfItem"],
          price:item["price"],
          brandName:item["brandName"],
          brandId:item["brandId"],

        })
      
  }) 
    res.send(tag)
  })
  
})


router.get('/sellers',auth,async (req, res) => {

  var regex =new RegExp(req.query.searchTerm,'i')

return RegisteredSeller.find({'$or':
[{brandName:regex},{firstName:regex}]}
,function(err,q){
  let seller=q.filter((item)=>{
    return item.allowed == true 
  })
  seller=seller.map((item)=>{
      
    return ({
      _id:item["_id"],
      brandName:item["brandName"],
      sells:item["sells"],

    })
  
})
  res.send(seller)
})



})

router.get('/availableIn',auth,async (req, res) => {

  var regex =new RegExp(req.query.searchTerm,'i')
  
 return Post.find({'$or':
  [{nameOfItem:regex},{hashTags:regex}]}
  ,function(err,tags){
    let tag=tags.filter((item)=>{
      return (item.deleted|| item.blocked) !== true 
    })
    tag=tag.map((item)=>{
      
      return ({
        _id:item["_id"],
        imageUrl:item["imageUrl"],
        nameOfItem:item["nameOfItem"],
        price:item["price"],
        location:item["location"],
        school:item["school"],
        brandName:item["brandName"],
        brandId:item["brandId"],

      })
    
})
      res.send(filter(tag,req.query.searchLocation))
    
  })

  function filter(q,letter){
    var filtered=q.filter(function(word){
      return word.location.toLowerCase().indexOf(letter.toLowerCase())>-1
    })
    return(filtered)
  }    

  

  })

  router.get('/availableInSchool',auth,async (req, res) => {

    var regex =new RegExp(req.query.searchTerm,'i')
    
   return Post.find({'$or':
    [{nameOfItem:regex},{hashTags:regex}]}
    ,function(err,tags){
      let tag=tags.filter((item)=>{
        return (item.deleted|| item.blocked) !== true 
      })
      tag=tag.map((item)=>{
      
        return ({
          _id:item["_id"],
          imageUrl:item["imageUrl"],
          nameOfItem:item["nameOfItem"],
          price:item["price"],
          location:item["location"],
          school:item["school"],
          brandName:item["brandName"],
          brandId:item["brandId"],

        })
      
  })
        res.send(filter(tag,req.query.searchSchool))
      
    })
  
    function filter(q,letter){
      var filtered=q.filter(function(word){
        return word.school.toLowerCase().indexOf(letter.toLowerCase())>-1
      })
      return(filtered)
    }    
  
    
  
    })

module.exports = router;