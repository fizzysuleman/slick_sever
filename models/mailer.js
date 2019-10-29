var nodemailer = require('nodemailer');
const config=require('config')
//For sending verifcation code to user

async function verificationCode(email,code,firstname,lastname){
  let pass=config.get('gmailPassword')
  if(!pass){
    throw new Error('password not set')
  }
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'contactslickapp@gmail.com', // generated ethereal user
        pass: '@Allahisgreat123' // generated ethereal password
      }
    }); 
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Slicky" <contactslickapp@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Slicky Verification code ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<p>${firstname} ${lastname}, to continue with the registration of your Slicky account,please verify using the code<b> ${code}</b></p>` // html body
    });
  
      return "Message sent: %s", info.messageId;

   

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
  //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }



//for sending succesfully registered to user

  async function successfullyRegistered(email,firstname,lastname){
    let =config.get('gmailPassword')
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'contactslickapp@gmail.com', // generated ethereal user
        pass: '@Allahisgreat123' // generated ethereal password
      }
    }); 
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Slick👻" <contactslickapp@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Successful registration✔", // Subject line
      text: "Hello", // plain text body
      html: `<p>${firstname} ${lastname},you have successfully registered to Slicky , Buy and sell to people in different locations and different schools<b> Buy slicky , Sell slicky</b></p>` // html body
    });
  
    
    
      return "Message sent: %s", info.messageId;

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
  //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }


  async function forgotPassword(email,username,token){
    let pass=config.get('gmailPassword')
    // console.log(process.env)
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'contactslickapp@gmail.com', // generated ethereal user
        pass: '@Allahisgreat123' // generated ethereal password
      }
    }); 
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Slicky" <contactslickapp@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Forgot Password Token", // Subject line
      text: "Hello", // plain text body
    html: `<p>This token is required to confirm if ${username} forgot his/her password, To continue type in this code <b> ${token}</b> in the section made available in the app</p>` // html body
    });
  
    
    
      return "Message sent: %s", info.messageId;

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
  //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  
 


  exports.mailer=verificationCode

  exports.successful=successfullyRegistered

  exports.forgotPasswordMailer=forgotPassword