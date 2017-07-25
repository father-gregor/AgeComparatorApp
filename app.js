//Initialize
var http = require("http");
var express = require("express");
var mongoose = require("mongoose");
var routes = require("./routes");
var user = require("./routes/user");
var path = require("path");
var database = require("./config/database");

var favicon = require("serve-favicon");
var morganLog = require("morgan");
var methodOverride = require("method-override");
var session = require("express-session");
var bodyParser = require("body-parser");
var multer = require("multer");
var errorHandler = require("errorhandler");

var app = express();

// Add environments variables
mongoose.connect(database.url);
app.set("port", process.env.PORT || 3000);
app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(morganLog("dev"));
app.use(methodOverride());
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: "uwotm8" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, "public")));

require("./server/routes")();

// error handling middleware should be loaded after the loading the routes
if ("development" == app.get("env")) {
    app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get("port"), function(){
    console.log("Listening on port " + app.get("port"));
});