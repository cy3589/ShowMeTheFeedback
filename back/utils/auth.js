const { User } = require("../models/index");
const { sign, refresh } = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.userLogin = async (email, password, res, user) => {
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const accessToken = sign(email);
  const refreshToken = refresh();

  return {
    accessToken,
    refreshToken,
  };
};

exports.duplicateCheck = async (nickname, email, res) => {
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    res.status(400);
    throw new Error("중복된 이메일입니다.");
  }
  const userNickname = await User.findOne({ nickname });
  if (userNickname) {
    res.status(400);
    throw new Error("중복된 닉네임입니다.");
  }
  return true;
};
