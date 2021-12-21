// 1. 이메일 형식 검사
exports.emailValidation = (email) => {
  const emailRegExp = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  );
  return emailRegExp.test(email);
};

// 2. 비밀번호 최소 길이
exports.passwordValidation = (password) => {
  if (password.includes(" ") || password.length < 8) {
    return false;
  }
  return true;
};
