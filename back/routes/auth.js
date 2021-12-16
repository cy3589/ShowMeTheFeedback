const { Router } = require("express");
const { TempUser } = require("../models/index");
const { userLogin, emailVerify } = require("../public/auth");
const sendMail = require("../public/sendMail");
const generateRandomCode = require("../public/randomCode");

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const token = userLogin(email, password);
  res.json({
    status: 200,
    token,
  });
});

router.post("/register", (req, res) => {
  // const { email, password, nickname, authcode } = req.body;
  res.json({
    status: 200,
  });
});

router.post("/register/email", async (req, res) => {
  const { nickname, email } = req.body;
  if (await emailVerify(nickname, email)) {
    const randomCode = generateRandomCode(5);

    await sendMail(email, "인증코드가 도착했습니다", randomCode);

    //TODO: 에러 핸들링

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

router.post("/reset-password", (req, res) => {
  res.json({
    status: 200,
  });
});

router.post("/find-password", (req, res) => {
  res.json({
    status: 200,
  });
});

module.exports = router;
