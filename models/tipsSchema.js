const mongoose=require('mongoose')
const Joi = require('joi');


const tipsSchema = new mongoose.Schema({
    message:String
});

const Tip=mongoose.model('Tip',tipsSchema)



  exports.Tip=Tip
