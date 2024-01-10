import nodeMailer from 'nodemailer';
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD_MAIL
    }
});

export const  sendCodeVerify  = async (email, code) => {
    const mailOptions = {
        from: process.env.USER_MAIL,
        to: email,
        subject: 'Verify Code',
        text: `Your verify code is: ${code}`
    };
    const info = await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent: '+ info.response);
        }
    });

    return info;
}
