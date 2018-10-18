const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const path = require('path');

//Declaring Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//DB config
const db = require("./config/keys").MongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Connection Successful"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);

//Using routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//if none of the aboce routes are being hit
// Serve static assests if in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder 
  app.use(express.static('client/build'));
  //create route to navigate to prod folder
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
