var mongoose = require("mongoose");
var User = mongoose.model("User", {
    name: String,
    surname: String,
    gender: String,
    age: Number,
    email: String
});

module.exports = User;
