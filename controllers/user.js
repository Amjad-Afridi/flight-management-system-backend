const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("User already registered.");

    const user = new User({ username, email, password });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("wrong password or email");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("wrong password or email");

    const token = user.generateAuthToken();
    res.status(200).json(token);
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json(err.message);
  }
};

module.exports = { register, login };
