
import nodemailer from 'nodemailer';


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
let SMTPtransporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "deepad.mca@gmail.com",
        pass: "Deepa@1890"
    }
});

export default SMTPtransporter;