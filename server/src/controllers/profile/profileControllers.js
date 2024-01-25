const User = require("../../models/user");

const fetchProfile = async (req, res) => {
  const userId = req.query.userId;

  const user = await User.findOne({ _id: userId });

  if (!user) return res.status(400).json("No user");
  return res.json(user);
};

const patchEmoji = async (req, res) => {
  const userId = req.query.userId;
  const { emoji } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!userId) return res.status(400).json("No user id Provided");
    if (!user) return res.status(400).json("No user");

    await User.updateOne({ _id: userId }, { $set: { emoji: emoji } });
    const updatedUser = await User.findOne({ _id: userId });
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const patchColor = async (req, res) => {
  const userId = req.query.userId;
  const { color } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!userId) return res.status(400).json("No user id Provided");
    if (!user) return res.status(400).json("No user");

    await User.updateOne({ _id: userId }, { $set: { color: color } });
    const updatedUser = await User.findOne({ _id: userId });
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = { fetchProfile, patchEmoji, patchColor };
