function isEmailValid(plainText) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(plainText);
}

function isPasswordValid(plainText) {
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(plainText);
}

module.exports = {
  isEmailValid,
  isPasswordValid,
};
