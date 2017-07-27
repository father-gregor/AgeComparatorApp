var validator = require("validator");

var isFormViable = function(userData) {
    return !validator.isEmpty(userData.name) &&
        !validator.isEmpty(userData.surname)&&
        !validator.isEmpty(userData.gender) &&
        !validator.isEmpty(userData.email) &&
        !validator.isEmpty(userData.age) &&
        validator.isEmail(userData.email) &&
        validator.isInt(userData.age);
}

module.exports = {
    isFormViable
}