const {ReportedBug}=require('../models/reportBugSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const reportBug= await new ReportedBug({
            userId:req.body.userId,
            bugMessage:req.body.message,
            timeReported:Date(),
            bugSolved:false
        })
      await reportBug.save()
    res.send('Thanks for reporting this bug, You are a genius!')

})



module.exports = router