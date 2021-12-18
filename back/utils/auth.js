const { User, TempUser } = require("../models/index");
const { sign, refresh } = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.userLogin = async (email, password, res) => {
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("가입되지 않은 이메일입니다");
  }

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

exports.userRegister = async (email, password, nickname, authCode, res) => {
  const tempUser = await TempUser.findOne({ email });
  if (!tempUser) {
    res.status(400);
    throw new Error("이메일 인증을 먼저 진행해주세요");
  }

  await exports.emailVerify(nickname, email, res);

  if (authCode === tempUser.authCode) {
    const newUser = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      nickname,
    });
    await TempUser.updateOne(
      { email },
      {
        $set: {
          email_verified: true,
        },
      }
    );
  } else {
    res.status(400);
    throw new Error("인증되지 않은 이메일입니다.");
  }
};

exports.emailVerify = async (nickname, email, res) => {
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
