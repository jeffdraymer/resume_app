const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  
  //text validation
  if (!Validator.isEmpty(data.text)) {
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
      errors.text = "Post must be between 10 and 300 characters";
    }
  } else {
    errors.text = "Text field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
