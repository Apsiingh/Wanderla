const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override"); // Corrected typo
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routers/listing.js");
const review = require("./routers/review.js");

// DB CONNECTION START
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
// DB CONNECTION END

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Corrected typo
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  httpOnly: true,
};

app.get("/", (req, res) => {
  res.send("Welcome To Root");
});

app.use(session(sessionOptions));
app.use(flash());

//middleWare for the flash message
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", review);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// MIDDLEWARE FOR ERROR HANDLING
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "SomeThing Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

let port = 8080;
app.listen(port, () => {
  console.log("server is running on the port :", port);
});
