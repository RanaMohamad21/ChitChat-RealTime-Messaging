const User = require("../models/users");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require('bcrypt')

module.exports.signup_post = async (req, res) => {
  try {
		const { userName, email, password } = req.body;

		const user = await User.findOne({ userName });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const newUser = new User({
			email,
			userName,
			password: hashedPassword,
		});

		if (newUser) {
			// Generate JWT token here
			const token = generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({newUser, token});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
  
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("Hello from login");
};
