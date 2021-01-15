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
  try{
    const tips= await Tip.find()

const tipsMessage=tips.map((item)=>{
    return item.message
})
  res.send(tipsMessage)
}
catch (ex) {
   res.status(500).send('Something failed from the server.')
}
})


module.exports = router