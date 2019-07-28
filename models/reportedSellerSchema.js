const mongoose=require('mongoose')

//const postSchema=require('./newPostSchema')
//Schema for the whole registeration of buyers

const reportedSellerSchema = new mongoose.Schema({
  userReportingId:String,
  sellerId:String,
  timeReported:Date,
  issueSolved:String
});

const ReportedSeller=mongoose.model('ReportedSeller',reportedSellerSchema)



  exports.ReportedSeller=ReportedSeller
