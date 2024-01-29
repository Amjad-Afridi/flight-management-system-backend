const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  data: {},
  userBookedSeats: [],
  user: {},
});

const Booking = mongoose.model("Booking", bookSchema);
module.exports = Booking;
