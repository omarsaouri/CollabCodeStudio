const express = require("express");
const router = express.Router();
const port = process.env.PORT;
const cors = require("cors");
const authController = require("../../controllers/auth/authController");
const signupMiddlewares = require("../../middlewares/auth/signupMiddlewares");
const authenticateToken = require("../../middlewares/auth/authToken");
const jwt = require("jsonwebtoken");
const authToken = require("../../middlewares/auth/authToken");

router.post(
  "/signup",
  signupMiddlewares.nameCheckMiddleware,
  signupMiddlewares.emailCheckMiddleware,
  signupMiddlewares.passwordCheckMiddleware,
  authController.registerUser
);
router.post("/login", authController.loginUser);

module.exports = router;
