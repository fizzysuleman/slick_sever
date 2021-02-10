const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const sharp = require("sharp");
const fs = require('fs')



const multer = require('multer')
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'productImages/')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})


const time = Date.now()

router.post('/', auth, async (req, res) => {
  const upload = multer({ storage }).array('productImages', 4)
  upload(req, res, function (err) {
    if (err) {
      return res.send(err)
    }


    // SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary')
    cloudinary.config({
      cloud_name: 'fizzysuleman',
      api_key: 132982359879386,
      api_secret: 'frx3566ti2x2grSSVX7DtJXzTa4'
    })

    console.log(req.files)


    let res_promises = req.files.map(async file => new Promise(async (resolve, reject) => {
      let MAX_SIZE = 10485760
      let x = (100 * MAX_SIZE) / file.size
      let editedFileName = file.size + file.originalname

      //If the file size is greater than 10mb
      if (file.size > MAX_SIZE) {
        await sharp(file.path)
          .toFormat("jpeg")
          .jpeg({ quality: Math.round(x) })
          .toFile(`editedImages/${editedFileName}`);
      }


      cloudinary
        .v2
        .uploader
        .upload((file.size <= MAX_SIZE) ? file.path :`editedImages\\${editedFileName}`,
          {
            quality:20,
            use_filename: true,
            unique_filename: false,
            folder: `sellers/${req.body.userId}/item/${req.body.itemName}/${time}`
          },
          function (error, result) {
            if (error) {
              (file.size > MAX_SIZE)?fs.unlinkSync(`editedImages\\${editedFileName}`):fs.unlinkSync(file.path)
              reject(error)
            }
            else {
              //const fs = require('fs')
              (file.size > MAX_SIZE)?fs.unlinkSync(`editedImages\\${editedFileName}`):fs.unlinkSync(file.path)
              resolve(result.url)
            }

          })

    })

    )
    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
      .then(result => res.send({ 'response': result }))
      .catch((error) => { res.status(400).send(error.message) })
  })


}
)
module.exports = router