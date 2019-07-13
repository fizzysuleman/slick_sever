const {Tip}=require('../models/tipsSchema')
const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')

router.post('/',auth, async (req, res) => { 

        const tip= await new Tip({
            message:req.body.message
        })
      await tip.save()
      res.send('Added')

})

router.get('/',auth,async(req,res)=>{
    const tips= await Tip.find()


  res.send(tips)
})


module.exports = router