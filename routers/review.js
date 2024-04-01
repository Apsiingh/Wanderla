const express  = require("express");
// const Review = require("../models/reviews.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");



const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.validate(req.body).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  // Reviews
// post Route

router.post(
    "/",
    validateReview,
    wrapAsync(async (req, res) => {
      let _id = req.params;
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
      listing.review.push(newReview);
      await newReview.save();
      await listing.save();
      res.redirect(`/listings/${listing._id}`);
    })
  );
  
  // Delete Review Routes
  router.delete(
    "/:reviewId",
    wrapAsync(async (req, res) => {
      let { id, reviewId } = req.params;
      await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
      await Review.findByIdAndDelete(reviewId);
  
      res.redirect(`/listings/${id}`);
    })
  );
  
  module.exports = router;
