var nodemailer = require('nodemailer');
var transporter =  nodemailer.createTransport('SMTP', {
    host: 'domain.com',
    port: 25,
    auth:false
});

// send mail with defined transport object
exports.SendMail = function(mailOptions){
    //console.log('yo');
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent');
        transporter.close();
    });
}