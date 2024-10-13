require("dotenv").config();
const User = require("../models/users");
const errorHandler = require("../utils/accountFields");
const { generateToken } = require("../utils/generateToken");

module.exports.signup = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    // Generate and send token via cookie
    const token = generateToken(user._id, res);

    // Send response with user data and token
    res.status(201).json({ user, token });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
	console.log(user)

    // Generate and send token via cookie
    const token = generateToken(user._id, res);
console.log(token)
    // Send response with user data and token
    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err.message);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  // Remove the JWT cookie
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
