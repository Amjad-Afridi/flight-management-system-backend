const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./database/DB");
const userRouter = require("./routes/user");
const flightRouter = require("./routes/flight");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/user", userRouter);
app.use("/flight", flightRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
