const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.get("/logout", authControllers.logout);
router.get("/getProfile", auth,  authControllers.getProfile)
router.put("/updateUsername", auth, authControllers.updateUsername)
router.post("/uploadProfilePhoto", auth, authControllers.uploadProfile)
router.delete("/deleteProfilePhoto", auth, authControllers.deleteProfile)

module.exports = router;
