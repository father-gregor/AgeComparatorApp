var nodemail = require("nodemailer");
/*File mail-credentials.js is excluded from git repo because contains credentials for auth in mail service. It look like this:
 var credentials = {
    service: "gmail",
    auth: {
        user: "YOUR_LOGIN",
        pass: "YOUR_PASSWORD"
    }
 }
 module.exports = credentials;
 */
var credentials = require("./secure/mail-credentials");
var transporter = nodemail.createTransport(credentials);

//Function to send email to new user with age stats. Using module nodemailer
function sendEmail(receiver, stats) {
    console.log("Stats: less=" + stats.lessAge + " greater=" + stats.greaterAge + " equal=" + stats.equalAge);
    transporter.sendMail({
        from: credentials.auth.user,
        to: receiver.email,
        subject: "Thanks for register! Look at our statistics",
        html: `Welcome, ${receiver.name} ${receiver.surname}!<br>
            We look at our database and found out that ${stats.lessAge} users are younger than you, ${stats.greaterAge} users are older
            and ${stats.equalAge} users are the same age as you - ${receiver.age}!`
    }, function(err, info) {
        if(err) {
            console.log("Error sending mail: " + err);
        } else {
            console.log("Email send: " + info.response);
        }
    })
}

module.exports = {
    sendEmailToAddress: sendEmail
};