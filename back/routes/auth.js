const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { TempUser } = require("../models/index");
const { userLogin, emailVerify, userRegister } = require("../utils/auth");
const sendMail = require("../utils/sendMail");
const generateRandomCode = require("../utils/randomCode");
// const generatePassword = require('../utils/randomPassword');

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userLogin(email, password, res);
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, nickname, authcode } = req.body;

    await userRegister(email, password, nickname, authcode, res);

    res.status(201).json({ message: "회원가입이 완료되었습니다!" });
  })
);

router.post(
  "/register/email",
  asyncHandler(async (req, res) => {
    const { nickname, email } = req.body;
    if (await emailVerify(nickname, email)) {
      const randomCode = String(generateRandomCode(1000, 9999));

      await sendMail(email, "인증코드가 도착했습니다", randomCode);

      const user = await TempUser.findOne({ email });

      if (!user) {
        await TempUser.create({ email, code: randomCode }, (err) => {
          if (err) {
            res.status(500);
            throw new Error();
          }
        });
      } else
        await TempUser.updateOne({ email }, { $set: { code: randomCode } });
    }
    res.status(200).json({
      message: "인증코드가 전송되었습니다.",
    });
  })
);

router.post(
  "/code-check",
  asyncHandler(async (req, res) => {
    const { code, email } = req.body;

    const tempUser = await TempUser.findOne({ email });

    if (code == tempUser.code) {
      await TempUser.updateOne({ email }, { $set: { email_verified: true } });
      res.status(200).json({
        message: "인증이 완료되었습니다.",
      });

      // TODO: tempUser 삭제 고려
      return;
    }
    res.status(403).json({
      message: "인증이 미완료되었습니다.",
    });
  })
);

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
