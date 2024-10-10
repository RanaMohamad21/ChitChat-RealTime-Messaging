module.exports.signup_post = (req, res) => {
  res.send("Hello from sign up");
};

module.exports.login_post = (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  res.send("Hello from login");
};
