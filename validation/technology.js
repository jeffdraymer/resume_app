const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTechnologyInput(data) {
    let errors = {};
    data.techName = !isEmpty(data.techName) ? data.techName : "";
    data.level = !isEmpty(data.level) ? data.level : "";

    if (Validator.isEmpty(data.techName)) {
        errors.techName = "Technology is Required";
    }

    if (Validator.isEmpty(data.level)) {
        errors.level = "Level is Required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};