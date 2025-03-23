const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);
// Protected route: profile (requires valid JWT)
router.get("/profile", authMiddleware, userController.profile);
module.exports = router;
