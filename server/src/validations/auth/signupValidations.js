const User = require("../../models/user");
// An example of an accepted username could be "user123".
const checkUsername = (username) => {
  const allowedCharactersRegex = /^[a-zA-Z0-9_]+$/;
  const consecutiveSpacesRegex = /\s{2,}/;
  if (!username) return { state: false, msg: "username is required" };
  if (username.length <= 2)
    return { state: false, msg: "username must be 4 characters at least " };
  if (username.length >= 25)
    return { state: false, msg: "username way too long" };
  if (!allowedCharactersRegex.test(username))
    return { state: false, msg: "username containing none allowed characters" };
  if (consecutiveSpacesRegex.test(username))
    return { state: false, msg: "username has two consecutive whitespaces" };
  return { state: true, msg: "" };
};
//valid email "user@example.com"
const checkEmail = async (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return { state: false, msg: "email is required" };
  if (!emailRegex.test(email)) return { state: false, msg: "non valid email " };
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) return { state: false, msg: "email is already used" };
  return { state: true, msg: "" };
};
//Userpwd123
const checkPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) return { state: false, msg: "password is required" };
  if (!passwordRegex.test(password)) return { state: false, msg: "wrong" };
  return { state: true, msg: "" };
};

module.exports = {
  checkUsername,
  checkEmail,
  checkPassword,
};
