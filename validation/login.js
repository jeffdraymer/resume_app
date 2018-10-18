const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //email validation
  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Please enter a valid email";
    }
  } else {
    errors.email = "Please enter your email";
  }
  //password validation
  if (!Validator.isEmpty(data.password)) {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be between 6 and 30 characters";
    }
  } else {
    errors.password = "Please enter a password";
  }

  return { errors, isValid: isEmpty(errors) };
};
