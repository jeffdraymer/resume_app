const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  //Handle validation
  if (!Validator.isEmpty(data.handle)) {
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = "Handle must be between 2 and 40 characters";
    }
  } else {
    errors.handle = "Handle is required";
  }
  //Status validation
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  //Status validation
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are required";
  }

  //Website Validation
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Must be a valid URL";
    }
  }

  //Youtube Validation
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Youtube link is not valid";
    }
  }

  //Twitter Validation
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Twitter link is not valid";
    }
  }

  //Linkedin Validation
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "LinkedIn link is not valid";
    }
  }

  //Instagram Validation
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Instagram";
    }
  }

  //Facebook Validation
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Facebook";
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
