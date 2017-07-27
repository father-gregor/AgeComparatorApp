var scheduler = require("node-schedule");
var User = require("./models/user");

//Function for export to main server file
var deleteOldestTask = function() {
    var startTime = new Date(Date.now() + 5000); //start after 5 seconds
    //Scheduler that run every 2 minutes and delete user with greatest field 'age'
    var scheduleObj = scheduler.scheduleJob({start: startTime, rule: "*/2 * * * *"}, function() {
        User.findOne({}).sort("-age").exec(function(err, user) {
            console.log("Removing oldest user task executed at " + new Date(Date.now()).toString());
            if(err) {
                console.log("Error while finding oldest user: " + err);
            } else {
                User.remove(user, function(err) {
                    if(err)
                        console.log("Error while removing oldest user: " + err);
                });
            }
        })
    });
}

module.exports = {
    deleteOldestTask
};