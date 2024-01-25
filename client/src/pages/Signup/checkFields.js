import validationFunctions from "./validationFunctions";

const checkFields = (
  email,
  name,
  password,
  setEmailFieldState,
  setNameFieldState,
  setPasswordFieldState,
  setEmailMsg,
  setNameMsg,
  setPasswordMsg
) => {
  let { stateName, msgName } = validationFunctions.checkNameField(name);
  let { stateEmail, msgEmail } = validationFunctions.checkEmailField(email);
  let { statePassword, msgPassword } =
    validationFunctions.checkPasswordField(password);

  if (stateName && stateEmail && statePassword) {
    setNameMsg("");
    setEmailMsg("");
    setPasswordMsg("");
    return true;
  }
  if (!stateName) {
    setNameFieldState(false);
    setNameMsg(msgName);
  } else {
    setNameFieldState(true);
    setNameMsg("");
  }
  if (!stateEmail) {
    setEmailFieldState(false);
    setEmailMsg(msgEmail);
  } else {
    setEmailFieldState(true);
    setEmailMsg("");
  }
  if (!statePassword) {
    setPasswordFieldState(false);
    setPasswordMsg(msgPassword);
  } else {
    setPasswordFieldState(true);
    setPasswordMsg("");
  }
};
export default checkFields;
