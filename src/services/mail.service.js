const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kwikhelp2023@gmail.com",
        pass: process.env.GMAIL_KEY,
    },
});

async function sendMail(email, username, token) {
    const mailOptions = {
        from: "kwikhelp2023@gmail",
        to: email,
        subject: "KwikHelp Account Recovery",
        html: `<h1>Hello ${username},</h1><p>Please click the link below to recover your account. (The link is only valid for 5mins!)</p><a href="https://kwikhelp.bryanc12.net/reset?&token=${token}">Magic Link</a>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        return error;
    }
}

module.exports = { sendMail };
