const {
  checkUsername,
  checkEmail,
  checkPassword,
} = require("../../validations/auth/signupValidations");

const nameCheckMiddleware = (req, res, next) => {
  const name = req.body.name;
  const { state, msg } = checkUsername(name);

  if (state) return next();
  res.status(400).json(msg);
};

const emailCheckMiddleware = async (req, res, next) => {
  const email = req.body.email;
  const { state, msg } = await checkEmail(email);

  if (state) return next();
  res.status(400).json(msg);
};

const passwordCheckMiddleware = (req, res, next) => {
  const password = req.body.password;
  const { state, msg } = checkPassword(password);

  if (state) return next();
  res.status(400).json(msg);
};

module.exports = {
  nameCheckMiddleware,
  emailCheckMiddleware,
  passwordCheckMiddleware,
};
