var mongoose = require("mongoose");
module.exports = mongoose.model("User", {
    name: String,
    surname: String,
    gender: String,
    age: Number,
    email: String
});
