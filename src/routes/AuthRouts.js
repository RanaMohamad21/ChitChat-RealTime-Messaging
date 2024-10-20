const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);
router.post("/uploadProfilePhoto", auth, authControllers.uploadProfile)
router.delete("/deleteProfilePhoto", auth, authControllers.deleteProfile)

module.exports = router;
