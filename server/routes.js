var User = require(".models/user");

module.exports = function(app) {
    //send main page index for any other request
    app.get("*", function(req, res) {
       res.send("./public/index.html");
    });
    app.get("/api/get-users", function(req, res) {
      User.find(function(err, users) {
          if(err)
              res.send(err);
          res.json(users);
      })
    });
    app.post("/api/add-user", function(req, res) {

    });
    app.delete("/api/delete-user", function(req, res) {

    });
};