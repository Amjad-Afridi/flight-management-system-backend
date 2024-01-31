const Flight = require("../models/flight");
const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
const getFlights = async (req, res) => {
  const filter = req.query.filter || {};
  const flightClass = req.query.class || null;
  const planeType = req.query.planeType || null;
  const stop = req.query.stop || null;
  const page = parseInt(req.query.page) || null;
  const limit = parseInt(req.query.limit) || null;
  const startIndex = (page && limit && (page - 1) * limit) || null;
  const endIndex = (page && limit && page * limit) || null;
  // //
  // if (filter) {
  //   Flight.find({
  //     filter,
  //   })
  //     .then((results) => res.status(200).json(result))
  //     .catch((err) => res.status(500).json(err.response));
  // }
  var flights = [];
  var response = {};
  try {
    if (flightClass && stop && planeType) {
      flights = await Flight.find({
        class: flightClass,
        stops: { $in: [stop] },
        planeType: planeType,
      });
    } else if (flightClass && planeType) {
      flights = await Flight.find({
        class: flightClass,
        planeType: planeType,
      });
    } else if (stop && planeType) {
      flights = await Flight.find({
        stops: { $in: [stop] },
        planeType: planeType,
      });
    } else if (flightClass && stop) {
      flights = await Flight.find({
        class: flightClass,
        stops: { $in: [stop] },
      });
    } else if (flightClass) {
      flights = await Flight.find({ class: flightClass });
    } else if (stop) {
      flights = await Flight.find({ stops: { $in: [stop] } });
    } else if (planeType) {
      flights = await Flight.find({ planeType: planeType });
    } else {
      flights = await Flight.find();
    }
    if (page && limit) {
      if (endIndex < flights.length) {
        response.next = {
          nextPage: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        response.previous = {
          previousPage: page - 1,
          limit: limit,
        };
      }
      response.data = flights.slice(startIndex, endIndex);
      return res.status(200).json(response);
    }
    response.data = flights;
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

const getSingleFlight = async (req, res) => {
  const { id } = req.params;
  Flight.findById(id)
    .then((flight) => {
      if (!flight) {
        return res.status(400).json("no flight with this record");
      }
      res.status(200).json(flight);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const bookSeat = (req, res) => {
  const { id } = req.params;
  Flight.findByIdAndUpdate(id, req.body, { new: true })
    .then((flight) => {
      res.status(200).json(flight);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

module.exports = { createFlight, getFlights, bookSeat, getSingleFlight };
