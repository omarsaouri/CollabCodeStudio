const checkEmoji = (emoji) => {
  const emojiRegex = /\p{Extended_Pictographic}/u;
  if (!emoji) return { state: false, msg: "Emoji is required" };
  if (emoji.length > 2) return { state: false, msg: "Just one emoji" };
  if (!emojiRegex.test(emoji)) return { state: false, msg: "Must be an Emoji" };
  return { state: true, msg: "" };
};

const checkColor = (color) => {
  const colorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  if (!color) return { state: false, msg: "Color is required" };
  if (!colorRegex.test(color)) return { state: false, msg: "Must be an Color" };
  return { state: true, msg: "" };
};

module.exports = { checkEmoji, checkColor };
