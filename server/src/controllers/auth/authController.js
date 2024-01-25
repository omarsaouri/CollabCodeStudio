const { hashPassword, comparePassword } = require("../../helpers/auth/hash");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// signup endpoint
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    await User.create(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
//login endpoint
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("No user found with this Email.");

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json("Wrong password.");

    const userPayload = {
      id: user._id,
    };
    const access_token = jwt.sign(userPayload, process.env.JWT_SECRET);

    res.json({ access_token: access_token, user: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
