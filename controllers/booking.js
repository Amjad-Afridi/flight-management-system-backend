const Booking = require("../models/booking");

const userBookingDetails = async (req, res) => {
  try {
    const response = await Booking.create(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUserBookingDetails = async (req, res) => {
  try {
    const response = await Booking.find({ "user.email": req.query.email });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  userBookingDetails,
  getUserBookingDetails,
};
