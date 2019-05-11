var nodemailer = require('nodemailer');

//For sending verifcation code to user

async function verificationCode(email,code,firstname,lastname){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'fizzysuleman@gmail.com', // generated ethereal user
        pass: 'respectislam' // generated ethereal password
      }
    }); 
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Slicky👻" <fizzysuleman@gmail.com>', // sender address
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

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'fizzysuleman@gmail.com', // generated ethereal user
        pass: 'respectislam' // generated ethereal password
      }
    }); 
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Slicky👻" <fizzysuleman@gmail.com>', // sender address
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


  
 


  exports.mailer=verificationCode

  exports.successful=successfullyRegistered