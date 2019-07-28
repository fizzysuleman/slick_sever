const {ReportedSeller}=require('../models/reportedSellerSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const reportSeller= await new ReportedSeller({
            userReportingId:req.body.userId,
            sellerId:req.body.sellerId,
            timeReported:Date(),
            issueSolved:false
        })
      await reportSeller.save()
      res.send('The brand has been successfully reported, Thanks for your feedback')

})



module.exports = router