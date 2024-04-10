module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  // console.log(req.path,"..", req.originalUrl)
  if (!req.isAuthenticated()) {
    //method to check user is logged in or not
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

//to save redirect url
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

