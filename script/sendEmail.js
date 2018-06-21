var nodemailer = require('nodemailer');

var emailFROM='portfoliu-suporte@hotmail.com';

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'portfoliu-suporte@hotmail.com',
    pass: 'port12345678'
  }
});



module.exports.transporter=transporter;
module.exports.emailFROM=emailFROM;

/*
var mailOptions = {
  from: 'portfoliu-suporte@hotmail.com',
  to: 'daniel_._19@hotmail.com',
  subject: 'EMAIL de TESTE',
  text: 'Como é que papa cu'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/