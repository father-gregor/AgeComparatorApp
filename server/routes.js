var User = require("./models/user");
var mailer = require("./email-sender");

module.exports = function(app) {
    app.get("/api/get-users", function(req, res) {
        sendUsersArray(res);
    });
    app.post("/api/add-user", function(req, res) {
        console.log(req.body);
        User.create(req.body, function(err, user) {
            if(err)
                res.send(err);
            console.log("INSERT USER");
            console.log(user);
            sendAgeStatsToEmail(user);
            sendUsersArray(res);
        });
    });
    app.delete("/api/delete-user", function(req, res) {

    });
    //Send main page index for any other request
    app.get("*", function(req, res) {
        res.send("./public/index.html");
    });
    function sendUsersArray(res) {
        User.find({},{_id: 0, __v: 0}, function(err, users) {
            if(err)
                res.send(err);
            console.log("Get users from DB");
            res.json(users);
        });
    }
    function sendAgeStatsToEmail(newUser) {
        var stats = {
            lessAge: 0,
            greaterAge: 0,
            equalAge: 0
        };
        User.find({_id: {
            $ne: newUser._id
        }}, function(err, users) {
            if(err) {
                console.log("Email wasn't send");
                console.log("Error occurred: " + err);
            } else {
               for(var i = 0, len = users.length; i < len; i++) {
                   if(parseInt(users[i].age) < parseInt(newUser.age))
                       stats.lessAge++;
                   else if(parseInt(users[i].age) > parseInt(newUser.age))
                       stats.greaterAge++;
                   else
                       stats.equalAge++;
               }
               mailer.sendEmailToAddress(newUser, stats);
            }
        });
    }
};