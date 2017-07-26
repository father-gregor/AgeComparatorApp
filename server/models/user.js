var mongoose = require("mongoose");
var User = mongoose.model("User", {
    name: String,
    surname: String,
    gender: String,
    age: Number,
    email: String
});
/*User.statics.constructObject = function(user) {
    return {
        name: user.name,
        surname: user.surname,
        gender: user.gender,
        age: user.age,
        email: user.email
    };
}*/
module.exports = User;
