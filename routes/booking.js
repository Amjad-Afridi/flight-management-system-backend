const express = require("express");
const router = express.Router();
const {
  userBookingDetails,
  getUserBookingDetails,
} = require("../controllers/booking");

router.post("/", userBookingDetails);
router.get("/", getUserBookingDetails);

module.exports = router;
