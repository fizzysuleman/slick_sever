const {ContactUs}=require('../models/contactUsSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const contactUs= await new ContactUs({
            userId:req.body.userId,
            message:req.body.message,
            timeReported:Date(),
            seen:false
        })
      await contactUs.save()
      res.send('Thank you for your feedback')

})



module.exports = router