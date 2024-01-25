const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  roomId: String,
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
