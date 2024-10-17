const nodemailer = require('nodemailer');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,          
    port: process.env.MAIL_PORT,          
    secure: process.env.MAIL_PORT == 465, 
    auth: {
        user: process.env.MAIL_USERNAME, 
        pass: process.env.MAIL_PASSWORD,  
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Function to send email
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to,
        subject,
        html: htmlContent,
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
};

module.exports = {
    sendEmail,
};