var mongoose = require("mongoose");
var schema = mongoose.Schema(
    {
        name: String,
        surname: String,
        gender: String,
        age: Number,
        email: String
    });
schema.statics.createAgeStats = function(user) {
    this.find({})
        .where("age").gt(user.age)
        .exec
}
var User = mongoose.model("User", {
    name: String,
    surname: String,
    gender: String,
    age: Number,
    email: String
});
module.exports = User;
