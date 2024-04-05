const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  console.log(username,email,password)
  const newUser = new User({ email, username });
  const registerUser = await User.register(newUser, password);
  console.log(registerUser);
  req.flash("success", "Welcome To WanderLa");
  res.redirect("/listings");
});

module.exports = router;
