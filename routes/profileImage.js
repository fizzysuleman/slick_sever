const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')


const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'profileImage/')
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  })


  router.post('/',auth, (req, res, next) => {
    const upload = multer({ storage }).single('profileImage')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: 'fizzysuleman',
        api_key: 132982359879386,
        api_secret: 'frx3566ti2x2grSSVX7DtJXzTa4'
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `profileImage/${req.body.userId}`, tags: `blog` }, // directory and tags are optional
        function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          res.json({url:image.url})
        }
      )
    })
  })
  
  module.exports=router