const nodemailer = require('nodemailer');

const clientId = "218830840358-m5jc0mfia8iqoestg95jd9jgqdvs7sid.apps.googleusercontent.com"
const refreshtoken ="1/SRWZP9vmhLacIF9nVO7SY-j3dTV_EFrgwXRUZAvxqoM"

exports.handler = function(event,context, callback){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            type:'OAuth2',
            user: 'sorenbaird@gmail.com',
            clientId,
            clientSecret: process.env.CLIENT_SECRET,
            refreshtoken
        }
    })
    const body = JSON.parse(event.body);
    const mailOptions = {
        to:'minikim9@hotmail.com',
        subject: `this is a test email from ${body.name}`,
        text: `Sender Name ${body.name}, Sender Email: ${body.email}, Sender Message ${body.message}`,

    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("error",error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
    
            })
        }else{
            callback(null,{
                statusCode: 200,
                body: JSON.stringify(info.response)
            })
        }
    })
}