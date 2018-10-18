const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.certification = !isEmpty(data.certification) ? data.certification : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required";
  }

  if (Validator.isEmpty(data.certification)) {
    errors.certification = "Certification field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
