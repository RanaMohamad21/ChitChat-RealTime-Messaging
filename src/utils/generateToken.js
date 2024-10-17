require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("SECRET environment variable is not defined");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
  });

  return token;
};

module.exports={generateToken}