const User = require("../models/users");
module.exports.signup_post = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await User.create({ email, userName, password });
    // Sending the user data back to the user and setting the status to success 
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send('error, user not created');
  }
  res.send("Hello from sign up");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("Hello from login");
};
