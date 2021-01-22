const Nexmo = require('nexmo');

async function sendToken(){

const nexmo = new Nexmo({
  apiKey: '0e4b5005',
  apiSecret: '6lSZNkJNkSBnZjiR',
});

const from = '14166288418';
const to = '2348090567164';
const text = 'Slick Verification code 2345';

nexmo.message.sendSms(from, to, text);
}
exports.sendToken=sendToken


// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// async function sendToken(phoneNumber,token,firstName,lastName){
// let sid;
// sid=await client.messages
//   .create({
//      body: `${firstName} Your Slick verification code is ${token}`,
//      from: '+16084715216',
//      to: '+19022133399'
//    })
// //   .then(message =>{
// //       sid=await message.sid
// //   })
// //   .catch(error=>console.log(error))

//   return sid.sid;

// }