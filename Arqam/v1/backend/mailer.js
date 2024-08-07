const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 465, // Replace with your SMTP server port
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'arqamking128@gmail.com', // Replace with your email
        pass: 'zdjs igez rrol rqfg' // Replace with your email password
    }
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: '"LabourLink" <221400044@gift.edu.pk>', 
        to,
        subject, 
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
