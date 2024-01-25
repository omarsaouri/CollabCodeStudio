const express = require("express");
const router = express.Router();
const port = process.env.PORT;
const cors = require("cors");
const roomControllers = require("../../controllers/room/roomControllers");
const authToken = require("../../middlewares/auth/authToken");

router.post("/new", authToken, roomControllers.newRoom);
router.get("/join/:roomId", authToken, roomControllers.joinRoom);

module.exports = router;
