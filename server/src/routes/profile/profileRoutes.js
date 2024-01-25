const express = require("express");
const router = express.Router();
const port = process.env.PORT;
const cors = require("cors");
const authToken = require("../../middlewares/auth/authToken");
const {
  emojiMiddleware,
  colorMiddleware,
} = require("../../middlewares/profile/profileMiddlewares");
const {
  fetchProfile,
  patchEmoji,
  patchColor,
} = require("../../controllers/profile/profileControllers");

router.get("/", authToken, fetchProfile);
router.patch("/emoji", authToken, emojiMiddleware, patchEmoji);
router.patch("/color", authToken, colorMiddleware, patchColor);

module.exports = router;
