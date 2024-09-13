const { Router } = require("express");
const authController = require("../controllers/authController");
const enrollController = require("../controllers/enrollController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

router.post("/enroll", requireAuth, enrollController.enroll);
router.get("/getStudentScores", requireAuth, enrollController.getStudentScores);

module.exports = router;
