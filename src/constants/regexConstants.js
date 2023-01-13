const regexConstants = {
  specialCharRegex: /[$&+,:;=?@#|'<>.^*()%!-]/g,
  onlyNumberRegex: /[0-9]/g,
  upperCaseRegex: /[A-Z]/g,
  lowerCaseRegex: /[a-z]/g,
  emailRegex: /^\S+@\S+\.\S+$/,
  characterRegex: /[a-zA-Z]/g,
  phoneNumberRegex: /\d/g,
};

export default regexConstants;
