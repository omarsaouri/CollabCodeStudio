const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  emoji: {
    type: String,
    default: "😃",
  },
  color: {
    type: String,
    default: "#000000",
  },
});

const UserModel = mongoose.model("User", userSchema);
//console.log(UserModel.find());
module.exports = UserModel;
