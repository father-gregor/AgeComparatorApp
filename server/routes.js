var User = require("./models/user");

module.exports = function(app) {
    app.get("/api/get-users", function(req, res) {
      User.find(function(err, users) {
          if(err)
              res.send(err);
          console.log(users);
          res.json(users);
      })
    });
    app.post("/api/add-user", function(req, res) {

    });
    app.delete("/api/delete-user", function(req, res) {

    });
    //Send main page index for any other request
    app.get("*", function(req, res) {
        res.send("./public/index.html");
    });
};