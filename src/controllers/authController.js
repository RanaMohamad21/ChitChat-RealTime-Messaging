require("dotenv").config();
const User = require("../models/users");
const errorHandler = require("../utils/accountFields");
const { uploadPhoto } = require("../utils/cloudinary");
const { generateToken } = require("../utils/generateToken");

const signup = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const profilePicture = `https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg`;
    const user = await User.create({
      email,
      userName,
      password,
      profilePicture,
    });
    // Generate and send token via cookie
    const token = generateToken(user._id, res);

    // Send response with user data and token
    res.status(201).json({ user, token });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    console.log(user);

    // Generate and send token via cookie
    const token = generateToken(user._id, res);
    console.log(token);
    // Send response with user data and token
    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err.message);
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

const logout = (req, res) => {
  // Remove the JWT cookie
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logout successful" });
};

const uploadProfile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const uploadedFile = req.files.photo;
  const email = req.user.email.toString();
  try {
    const url = await uploadPhoto(uploadedFile);

    const user = await User.findOneAndUpdate(
      { email },
      { profilePicture: url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user information
    return res.json({ user });
  } catch (error) {
    console.error("Error in upload process:", error.message);
    return res.status(500).json({ message: "Upload failed" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const defaultProfilePic = `https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg`;

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { profilePicture: defaultProfilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the updated user data with the default profile picture
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return res.status(500).json({ message: "Failed to delete profile photo." });
  }
};

module.exports = {
  signup,
  login,
  logout,
  uploadProfile,
  deleteProfile,
};
