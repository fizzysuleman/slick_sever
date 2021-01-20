const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')


const multer = require('multer')
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'productImages/')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})


const time=Date.now()

router.post('/',auth,async(req,res)=>{
  const upload = multer({ storage }).array('productImages',4)
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    console.log('file uploaded to server')

    // SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: 'fizzysuleman',
      api_key: 132982359879386,
      api_secret: 'frx3566ti2x2grSSVX7DtJXzTa4'
    })


    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, {quality:15, use_filename: true, unique_filename: false,folder: `sellers/${req.body.userId}/item/${req.body.itemName}/${time}`}, function (error, result) {
          if(error){
            const fs = require('fs')
           fs.unlinkSync(file.path)
            reject(error)
          } 
          else {
            const fs = require('fs')
            fs.unlinkSync(file.path)
            resolve(result.url)
          }
        
      })
  })
  )
  // Promise.all will fire when all promises are resolved 
  Promise.all(res_promises)
  .then(result =>  res.send({'response':result}))
  .catch((error) => {res.status(400).send(error)})
})

   
  }
)
  module.exports=router