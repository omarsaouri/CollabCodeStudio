const checkNameField = (username) => {
  const allowedCharactersRegex = /^[a-zA-Z0-9_]+$/;
  const consecutiveSpacesRegex = /\s{2,}/;
  if (!username) return { stateName: false, msgName: "Name is required" };
  if (username.length <= 2)
    return { stateName: false, msgName: "Name too short" };
  if (username.length >= 25)
    return { stateName: false, msgName: "Name too long" };
  if (!allowedCharactersRegex.test(username))
    return {
      stateName: false,
      msgName: "Invalid name characters.",
    };
  if (consecutiveSpacesRegex.test(username))
    return { stateName: false, msgName: "Double spaces in name." };
  return { stateName: true, msgName: "" };
};

const checkEmailField = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return { stateEmail: false, msgEmail: "Email is required" };
  if (!emailRegex.test(email))
    return { stateEmail: false, msgEmail: "Non valid email" };
  return { stateEmail: true, msgEmail: "" };
};

const checkPasswordField = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const minLengthRegex = /.{8,}/;
  const letterRegex = /[A-Za-z]/;
  const digitRegex = /\d/;

  if (!password) {
    return { statePassword: false, msgPassword: "Password is required" };
  }
  if (!minLengthRegex.test(password)) {
    return {
      statePassword: false,
      msgPassword: "Minimum 8 characters for the password.",
    };
  }
  if (!letterRegex.test(password)) {
    return {
      statePassword: false,
      msgPassword: "Include a letter in the password.",
    };
  }
  if (!digitRegex.test(password)) {
    return {
      statePassword: false,
      msgPassword: "Include a digit in the password.",
    };
  }
  return { statePassword: true, msgPassword: "" };
};
const validationFunctions = {
  checkNameField,
  checkEmailField,
  checkPasswordField,
};

export default validationFunctions;
