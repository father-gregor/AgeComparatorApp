var nodemail = require("nodemailer");
var credentials = require("./secure/mail-credentials");
var transporter = nodemail.createTransport(credentials);
function sendEmail(receiver, stats) {
    console.log("Stats: less=" + stats.lessAge + " greater=" + stats.greaterAge + " equal=" + stats.equalAge);
    transporter.sendMail({
        from: credentials.auth.user,
        to: receiver.email,
        subject: "Thanks for register! Look at our statistics",
        html: "Welcome, " + receiver.name + " " + receiver.surname + "!"
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