const mongoose=require('mongoose')
const Joi = require('joi');

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const wishListSchema = new mongoose.Schema({
  userId:String,
  postIds:Array
});

const WishList=mongoose.model('WishList',wishListSchema)



  exports.WishList=WishList
