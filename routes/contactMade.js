const {Contact}=require('../models/contactSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const contact= await new Contact({
            platformContacted:req.body.platform,
            timeContacted:Date(),
            userId:req.body.userId,
            sellerId:req.body.sellerId
        })
      await contact.save()
      res.send('Saved')

})



module.exports = router