const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authController");
router.post("/signup", authControllers.signup_post);
router.post("/login", authControllers.login_post);

module.exports = router;
