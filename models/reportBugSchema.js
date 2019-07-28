const mongoose=require('mongoose')

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const reportBugSchema = new mongoose.Schema({
  userId:String,
  bugMessage:String,
  timeReported:Date,
  bugSolved:String
});

const ReportedBug=mongoose.model('ReportedBug',reportBugSchema)



  exports.ReportedBug=ReportedBug
