var User = require("./models/user");
var mailer = require("./email-sender");
var validator = require("./form-validator");

module.exports = function(app) {
    app.get("/api/get-users", function(req, res) {
        sendUsersArray(res);
    });
    app.post("/api/add-user", function(req, res) {
        var result = validator.isFormViable(req.body);
        if(result) {
            User.create(req.body, function(err, user) {
                if(err)
                    res.send(err);
                sendAgeStatsToEmail(user);
                sendUsersArray(res);
            });
        } else
            res.status(500).send("User data is not viable");
    });
    app.delete("/api/delete-user", function(req, res) {
        User.remove(res.params._id, function(err) {
            if(err)
                res.send(err);
            sendUsersArray(res);
        })
    });
    //Send main page index for any other request
    app.get("*", function(req, res) {
        res.send("./public/index.html");
    });
    //Utility function to get all users from db
    function sendUsersArray(res) {
        User.find({},{__v: 0}, function(err, users) {
            if(err)
                res.send(err);
            res.json(users);
        });
    }
    //Collect age stats(find younger/older/same age users) and send them by calling function from module mailer
    //Otherwise it could be done by making multiple calls to database
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