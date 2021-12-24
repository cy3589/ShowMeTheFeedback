const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  login,
  register,
  emailRegister,
  passwordFind,
} = require("./auth.controller");

const router = Router();

router.post("/login", asyncHandler(login));
router.post("/register", asyncHandler(register));
router.post("/register/email", asyncHandler(emailRegister));
router.post("/find-password", asyncHandler(passwordFind));

module.exports = router;

// TODO: tempUser 삭제 고려, 인증 번호 확인 버튼 삭제 고려 중
// router.post(
//   "/code-check",
//   asyncHandler(async (req, res) => {
//     const { code, email } = req.body;

//     const tempUser = await TempUser.findOne({ email });

//     if (code == tempUser.code) {
//       await TempUser.updateOne({ email }, { $set: { email_verified: true } });
//       res.status(200).json({
//         message: "인증이 완료되었습니다.",
//       });

// return;
//   }
//   res.status(403).json({
//     message: "인증이 미완료되었습니다.",
//   });
// })
// );
