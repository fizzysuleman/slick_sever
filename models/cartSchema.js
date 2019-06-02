const mongoose=require('mongoose')
const Joi = require('joi');

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const cartSchema = new mongoose.Schema({
  userId:String,
  postIds:Array
});

const Cart=mongoose.model('Cart',cartSchema)



  exports.Cart=Cart
