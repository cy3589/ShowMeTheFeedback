// 1. 이메일 형식 검사
exports.emailValidation = (email, res) => {
  const emailRegExp = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  );
  if (!emailRegExp.test(email)) {
    res.status(400);
    throw new Error("이메일 형식이 올바르지 않습니다.");
  }
  return true;
};

// 2. 비밀번호 최소 길이
exports.passwordValidation = (password, res) => {
  if (password.includes(" ") || password.length < 8) {
    res.status(400);
    throw new Error("비밀번호를 8자 이상 입력해주세요");
  }
  return true;
};
