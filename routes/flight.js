const express = require("express");
const router = express.Router();
const {
  createFlight,
  getFlights,
  bookSeat,
  getSingleFlight,
} = require("../controllers/flight");

router.post("/", createFlight);
router.get("/", getFlights);
router.get("/:id", getSingleFlight);
router.patch("/book-seat/:id", bookSeat);
module.exports = router;
