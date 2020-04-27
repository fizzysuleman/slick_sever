const express = require('express');
const router = express.Router();
var deeplink = require('node-deeplink');
 
 
router.get('/',
  deeplink({
    fallback: 'https://play.google.com/store/apps/details?id=com.slick.slick',
    android_package_name: 'com.slick.slick',
     ios_store_link:
       'https://apps.apple.com/ca/app/slick-buy-and-sell/id1510237901'
  })
);


module.exports = router;