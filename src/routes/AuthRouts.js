const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authController");
router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);

module.exports = router;
