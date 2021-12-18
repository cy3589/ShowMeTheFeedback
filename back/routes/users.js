const { Router } = require("express");
const bcrypt = require("bcrypt");
const asyncHandler = require("../utils/asyncHandler");
const { User } = require("../models");

const router = Router();

router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({
        message: "비밀번호가 같지 않습니다.",
      });
      return;
    } else {
      await User.findOneAndUpdate(
        { email },
        {
          $set: {
            password: await bcrypt.hash(password, 10),
          },
        }
      );
      res.status(201).json({
        message: "비밀번호가 성공적으로 변경되었습니다.",
      });
      return;
    }
  })
);

router.post(
  "/reset-nickname",
  asyncHandler(async (req, res) => {
    const { nickname, changeNickname } = req.body;

    const user = await User.findOne({ nickname: changeNickname });
    if (user) {
      res.status(400);
      res.json({
        message: "이미 존재하는 닉네임입니다.",
      });
      return;
    } else {
      await User.findOneAndUpdate(
        { nickname },
        {
          $set: {
            nickname: changeNickname,
          },
        }
      );
      res.status(201);
      res.json({
        message: "닉네임이 성공적으로 변경되었습니다.",
      });
      return;
    }
  })
);

module.exports = router;
