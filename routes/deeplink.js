const express = require('express');
const router = express.Router();
var deeplink = require('node-deeplink');
 
 
router.get('/',
  deeplink({
    fallback: 'https://play.google.com/store/apps/details?id=com.slick.slick',
    android_package_name: 'com.slick.slick',
     ios_store_link:
       'https://itunes.apple.com/us/app/cups-unlimited-coffee/id556462755?mt=8&uo=4'
  })
);


module.exports = router;