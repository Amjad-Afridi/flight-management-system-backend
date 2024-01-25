const express = require("express");
const router = express.Router();
const {
  createFlight,
  getFlights,
  getSingleFlight,
} = require("../controllers/flight");

router.post("/", createFlight);
router.get("/", getFlights);
router.get("/:id", getSingleFlight);
module.exports = router;
