const express = require("express");
const router = express.Router();
//Used for setting user avatar
const gravatar = require("gravatar");
//Used for encrypting password
const bcrypt = require("bcryptjs");
//JSON Web Token
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//Load User model
const User = require("../../models/User");

//Load validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route /api/users/register
// @desc register users route
// @access Public
router.post("/register", (req, res) => {
  //Validate user input
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Check the DB for the entered email, 
  //If it exists then return an error
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ name: "Username already exists" });
    } else {
      //Check that the username does not already exist
      User.findOne({ email: req.body.email }).then(user => {

        if(user){
          return res.status(400).json({ email: "Email already exists" });
        } else{ 
      
          //Using gravatar feature to display user avatar if available,
          //else set avatar to default image
          const avatar = gravatar.url(req.body.email, {
            s: "200", //size
            r: "pg", //rating
            d: "mm" //default
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          }); 
        }   
     });
    }
  });
});

// @route /api/users/login
// @desc Login User / Return JWT token
// @access Public

router.post("/login", (req, res) => {
  //Validate user input
  const { errors, isValid } = validateLoginInput(req.body);
  

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //find the users email
  User.findOne({ email }).then(user => {
    //Check if a user was returned
    if (!user) {
      errors.email = "User was not found";
      return res.status(404).json( errors );
    }
    //Check passowrd
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        //Create JWT payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json( errors );
      }
    });
  });
});

module.exports = router;
