const { Router } = require("express");
const { TempUser, User } = require("../models/index");
const { userLogin, emailVerify } = require("../utils/auth");
const sendMail = require("../utils/sendMail");
const generateRandomCode = require("../utils/randomCode");
// const generatePassword = require('../utils/randomPassword');
const bcrypt = require("bcrypt");

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await userLogin(email, password);

  res.json({
    status: 200,
    token,
  });
});

router.post("/register", async (req, res) => {
  const { email, password, nickname, authcode } = req.body;

  const tempUser = await TempUser.findOne({ email });
  if (authcode === tempUser.authcode && tempUser.code) {
    await User.create({
      email,
      password: bcrypt.hash(password, 10),
      nickname,
    });

    res.status(201).json({ message: "회원가입이 완료되었습니다!" });
  }
});

router.post("/register/email", async (req, res) => {
  const { nickname, email } = req.body;
  if (await emailVerify(nickname, email)) {
    const randomCode = String(generateRandomCode(1000, 9999));

    await sendMail(email, "인증코드가 도착했습니다", randomCode);

    await TempUser.create({ email, code: randomCode });
  }
  res.json({
    status: 200,
  });
});

router.post("/code-check", async (req, res) => {
  const { code, email } = req.body;

  const tempUser = await TempUser.findOne({ email });

  if (code == tempUser.code) {
    res.status(200).json({
      message: "인증이 완료되었습니다.",
    });
    return;
  }
  res.status(403).json({
    message: "인증이 미완료되었습니다.",
  });
});

// router.post('/reset-password', (req, res) => {
//   res.json({
//     status: 200,
//   });
// });

// router.post('/find-password', async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error('등록되지 않은 이메일입니다.')
//   }

//   const randomPassword = generatePassword();
//   await sendMail(email, '임시비밀번호가 도착했습니다', randomPassword);

//   res.json({
//     status: 200,
//   });
// });

module.exports = router;
