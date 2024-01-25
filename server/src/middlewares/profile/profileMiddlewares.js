const {
  checkEmoji,
  checkColor,
} = require("../../validations/profile/profileValidations");

const emojiMiddleware = (req, res, next) => {
  const { emoji } = req.body;

  let { state, msg } = checkEmoji(emoji);
  if (state) return next();
  return res.status(400).send(msg);
};

const colorMiddleware = (req, res, next) => {
  const { color } = req.body;

  let { state, msg } = checkColor(color);
  if (state) return next();
  return res.status(400).send(msg);
};

module.exports = { emojiMiddleware, colorMiddleware };
