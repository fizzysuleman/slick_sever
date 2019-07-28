const mongoose=require('mongoose')
const Joi = require('joi');

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const reportedItemSchema = new mongoose.Schema({
  userReportingId:String,
  postId:String,
  sellerId:String,
  timeReported:Date,
  issueSolved:String
});

const ReportedItem=mongoose.model('ReportedItem',reportedItemSchema)



  exports.ReportedItem=ReportedItem
