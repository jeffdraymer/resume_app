const express = require("express");
const router = express.Router();
const mongosse = require("mongoose");
const passport = require("passport");

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const validateTechnologyInput = require("../../validation/technology");

//Load Profile model
const Profile = require("../../models/Profile");
//Load User model
const User = require("../../models/User");

// @route /api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ message: "Profile Works" }));

// @route GET /api/profile
// @desc gets user profile info
// @access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No matching profile was found";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET /api/profile/handle/:handle
// @desc gets user profile basded on the handle
// @access Public
router.get("/all", (req, res) => {
  const errrors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "No profiles found" });
    });
});

// @route GET /api/profile/handle/:handle
// @desc gets user profile basded on the handle
// @access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["user", "name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found for this user";
        res.status(404).json(errors);
      }
      //If profile is found then return it
      res.json(profile);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route GET /api/profile/user/:user_id
// @desc gets user profile basded on the user_id  5b3574365057092725171903
// @access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile exists for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json({ profile: "There is no profile for this user" });
    });
});

// @route POST /api/profile
// @desc Creates new user profile entry or update profile details
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Check Validation
    if (!isValid) {
      console.log(errors);
      return res.status(400).json(errors);
    }

    //Get profile fields
    const profileFields = {};
    //initialize oject for social media links
    profileFields.social = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //Splits common separated values into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update the existing profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create a new profile

        //Check if handle already exists
        Profile.findOne({ handle: profileFields.handle }).then(handle => {
          if (handle) {
            errors.handle = "Profile handle already exists";
            res.status(400).json(errors);
          }
          //If new handle then save the object
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route POST /api/profile/experience
// @desc Add the experience section of the users profile
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add experience to array
      profile.experience.unshift(newExperience);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route POST /api/profile/education
// @desc Add the education section of the users profile
// @access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    console.log("GotHere");
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = {
        school: req.body.school,
        certification: req.body.certification,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add experience to array
      profile.education.unshift(newEducation);

      profile.save().then(profile => res.json(profile));

    });
  }
);

// @route POST /api/profile/technology
// @desc Add to the technology section of the users profile
// @access Private

router.post(
  "/technology", passport.authenticate("jwt", { session: false }), (req, res) => {
    //Validate the data which was passed from the action

    const { errors, isValid } = validateTechnologyInput(req.body);

    //If data is not valid then return the errors object
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Search for profile in the DB
    Profile.findOne({ user: req.user.id })
      .then(profile => {

        //If the profile is returned then assign params to new object
        const newTech = {
          techName: req.body.techName,
          level: req.body.level,
          description: req.body.description
        }
        //Add new tech to the profile and then save to DB
        profile.technology.unshift(newTech);
        profile.save().then(profile => res.json(profile));

      })
      //catch any unexpected errors
      .catch(err => res.status(500).json(err));

  }
);

// @route Delete /api/profile/experience/:exp_id
// @desc Remove the experience section of the users profile
// @access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out the array
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route Delete /api/profile/education/:edu_id
// @desc Remove the education section of the users profile
// @access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out the array
        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route Delete /api/profile/education/:edu_id
// @desc Remove the education section of the users profile
// @access Private
router.delete(
  "/technology/:tech_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Search the tech array for the tech_id which is passed in and get the index for removal
        const removeIndex = profile.technology
          .map(tech => tech.id)
          .indexOf(req.params.tech_id)

        //Splice the found index out of the tech array
        profile.technology.splice(removeIndex, 1);
        //Save the updated profile to the DB and then return the profile to the action
        profile.save().then(profile => res.json(profile))

      })
      .catch(err => res.status(404).json(err));
  }
);

// @route Delete /api/profile
// @desc Remove the users profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
