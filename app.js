//Initialize
var http = require("http");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var database = require("./config/database");

var morganLog = require("morgan");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var app = express();

// Add environments variables
var promise = mongoose.connect(database.url, database.options);
app.set("port", process.env.PORT || 3000);
app.use(morganLog("dev"));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//promise.then(function)
require("./server/routes")(app);

var server = http.createServer(app);
server.listen(app.get("port"), function(){
    console.log("Listening on port " + app.get("port"));
});