const express = require("express");
const Listing = require("../models/listing.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// controllers
const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index Route
  .post(
    //create route
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListings)
  );

// IMPORTANT :- NEW ALWAYS BE UPPER THAN SHOW ROUTE
// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListings)) //Show route
  .put(
    // Update Route
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    // Delete Route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
