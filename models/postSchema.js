const mongoose=require('mongoose')
const Joi = require('joi');

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const postSchema = new mongoose.Schema({
  nameOfItem: {
      type: String,
      minlength: 1,
      maxlength: 40
    },
  price:{
      type:String
  },
  hashTags:String,
  colorAvailable:String,
  sizeAvailable:String,
  location:String,
  school:String,
  category:String,
  addedToWishList:Array,
  addedToCart:Array,
  paidForByCard:Array,
  blocked:Boolean,
  deleted:Boolean,
  imageUrl:Array,
  creationTime:Date,
  brandName:String,
  brandId:String,
  negotiable:Boolean

},{
versionKey:false
});

const Post=mongoose.model('Post',postSchema)

function validatePost(user){
    const schema={
      nameOfItem :Joi.string().min(1).max(40).required(),
      price:Joi.string().min(1).max(10).required(),
      hashTags: Joi.string().min(1).max(255).required(),
      location:Joi.string().min(1).max(50),
      category:Joi.string().required(),
      imageUrl: Joi.array().min(1).max(4),
      colors:Joi.string().allow('').optional(),
      sizes:Joi.string().allow('').optional(),
      school:Joi.string().allow('').optional(),
      brandId:Joi.string(),
      negotiable:Joi.bool()
    }
    return Joi.validate(user, schema);

  }

  exports.validatePost=validatePost
  exports.Post=Post
