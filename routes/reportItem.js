const {ReportedItem}=require('../models/reportedItemSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const reportItem= await new ReportedItem({
            userReportingId:req.body.userId,
            postId:req.body.postId,
            sellerId:req.body.sellerId,
            timeReported:Date(),
            issueSolved:false
        })
      await reportItem.save()
      res.send('The Item has been successfully reported, Thanks for your feedback')

})



module.exports = router