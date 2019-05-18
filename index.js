const mongoose = require('mongoose');
const express=require('express')
const config=require('config')
const buyers=require('./routes/registerBuyer')
const sellers=require('./routes/registerSeller')
const registerBuyer1=require('./routes/registerBuyers1')
const registerSeller1=require('./routes/registerSeller1')
const loginBuyerAuth=require('./routes/loginBuyerAuth')
const loginSellerAuth=require('./routes/loginSellerAuth')
const sellerProfile=require('./routes/sellerProfile')
const productImages=require('./routes/productImages')
const addNewPost=require('./routes/addNewPost')
const sellerItems=require('./routes/sellerItems')
const verificationBuyerToken=require('./routes/verificationBuyerToken')
const verificationSellerToken=require('./routes/verificationSellerToken')
const app=express()

//using the config with jwtPrivateKey in the environment variables
if(!config.get('jwtPrivateKey')){
    console.error('jwtPrivateKey is not defined')
    process.exit(1)
  }

  //connecting to our local mongodb 
mongoose.connect('mongodb://localhost/slicky', { useCreateIndex: true,useNewUrlParser: true})
 .then(()=>console.log('Connected to mongo'))
 .catch(err=>console.error('Could not connect'))


 app.use(express.json())
app.use('/api/registerBuyer',buyers)
app.use('/api/registerSeller',sellers)
app.use('/api/registerBuyer1',registerBuyer1)
app.use('/api/registerSeller1',registerSeller1)
app.use('/api/verificationBuyerToken',verificationBuyerToken)
app.use('/api/verificationSellerToken',verificationSellerToken)
app.use('/api/loginBuyer',loginBuyerAuth)
app.use('/api/loginSeller',loginSellerAuth)
app.use('/api/sellerProfile',sellerProfile)
app.use('/api/uploadProductImages',productImages)
app.use('/api/addNewPost',addNewPost)
app.use('/api/sellerItems',sellerItems)




//console.log(process.env)
 const port=process.env.PORT||3000

 app.listen(port,()=>console.log(`Listening to port ${port}`))
