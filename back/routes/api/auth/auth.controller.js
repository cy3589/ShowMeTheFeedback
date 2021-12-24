const bcrypt = require("bcrypt");
const { userLogin, duplicateCheck } = require("../../../utils/auth");
const { User, TempUser } = require("../../../models");
const generateRandomCode = require("../../../utils/randomCode");
const generatePassword = require("../../../utils/randomPassword");
const {
  emailValidation,
  passwordValidation,
} = require("../../../utils/validation");
const sendMail = require("../../../utils/sendMail");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("가입되지 않은 이메일입니다");
  }

  const { accessToken, refreshToken } = await userLogin(
    email,
    password,
    res,
    user
  );
  res.status(200).json({
    accessToken,
    refreshToken,
  });
  return;
};

exports.register = async (req, res) => {
  const { email, password, nickname, authCode } = req.body;

  emailValidation(email, res);
  passwordValidation(password, res);

  const tempUser = await TempUser.findOne({ email });
  if (!tempUser) {
    res.status(400);
    throw new Error("이메일 인증을 먼저 진행해주세요");
  }

  const isDuplicated = await duplicateCheck(nickname, email, res);

  if (isDuplicated && Number(authCode) == tempUser.authCode) {
    await User.create({
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
  res.status(201).json({ message: "회원가입이 완료되었습니다!" });
};

exports.emailRegister = async (req, res) => {
  const { nickname, email } = req.body;
  const isDuplicated = await duplicateCheck(nickname, email, res);
  if (isDuplicated) {
    const randomCode = String(generateRandomCode(1000, 9999));

    await sendMail(email, "인증코드가 도착했습니다", randomCode);

    const user = await TempUser.findOne({ email });

    if (!user) {
      await TempUser.create({ email, authCode: randomCode }, (err) => {
        if (err) {
          res.status(500);
          throw new Error("서버 에러");
        }
      });
    } else
      await TempUser.updateOne({ email }, { $set: { authCode: randomCode } });
  }
  res.status(200).json({
    message: "인증코드가 전송되었습니다.",
  });
};

exports.passwordFind = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("등록되지 않은 이메일입니다.");
  }

  const randomPassword = generatePassword();

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: await bcrypt.hash(randomPassword, 10),
      },
    }
  );
  await sendMail(email, "임시비밀번호가 도착했습니다", randomPassword);

  res.json({
    status: 201,
  });
};
