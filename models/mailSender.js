const sgMail = require('@sendgrid/mail')



async function sendConfirmationToken(email,code, firstName, lastName){
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to:  `${email}`, // Change to your recipient
  from: 'contactslickapp@gmail.com', // Change to your verified sender
  subject: 'Welcome, Your Slick Verication Code',
  text: 'Confirm registration',
  html: `<p><strong>Welcome to Slick ${firstName}</strong><br></br>Confirm your registration with the verification code <b>${code}</b><br></br>Happy Shopping 👻<p>`,
}
let message=sgMail
  .send(msg)
  
  return message
}

async function forgotPassword(email, username, token){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to:  `${email}`, // Change to your recipient
    from: 'contactslickapp@gmail.com', // Change to your verified sender
    subject: 'Successful Registration',
    text: 'Succesful Registration',
    html: `<p>This code is required to change ${username} forgotten password, To continue type in this code <b> ${token}</b> in the section made available in the app</p><br></br>If not please ignore this email, Thank you`,
  }
  let message=sgMail
    .send(msg)
    
    return message
  }

exports.sendConfirmationToken=sendConfirmationToken
exports.forgotPassword=forgotPassword

