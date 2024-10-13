require("dotenv").config();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60; // token max age in seconds.

function errorHandler(err) {
  let errors = { email: "", password: "", userName: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered.";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = err.message;
  }
  // Duplicate email error code:
  if (err.code === 11000) {
    errors.email = "that email is already registered.";
    return errors;
  }

  // Validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// param: user id
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

module.exports.signup = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // max age in milli seconds
    });
    // Sending the user data back to the user and setting the status to success
    res.status(201).json({ user: user._id }); // Sending only the user ID.
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // max age in milli seconds
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  // remove the token
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};