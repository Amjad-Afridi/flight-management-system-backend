const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airplaneNumber: { type: String, required: true },
  planeType: { type: String, required: true },
  vacantSeats: [{ type: Number, required: true }],
  bookedSeats: [{ type: Number, required: true }],
  class: { type: String, enum: ["business", "economy"], required: true },
  stops: [{ type: String, required: true }],
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
