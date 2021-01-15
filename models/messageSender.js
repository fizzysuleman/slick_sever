const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendToken(phoneNumber,token,firstName,lastName){
let sid;
sid=await client.messages
  .create({
     body: `${firstName} Your Slick verification code is ${token}`,
     from: '+16084715216',
     to: '+19022133399'
   })
//   .then(message =>{
//       sid=await message.sid
//   })
//   .catch(error=>console.log(error))

  return sid.sid;

}

exports.sendToken=sendToken
