const bcrypt = require("bcrypt");
const { User } = require("../../../models");

exports.getMyAccount = async (req, res) => {
  const { email } = req;

  const user = await User.findOne({ email });

  res.status(200).json({
    email,
    nickname: user.nickname,
  });
};

exports.resetPassword = async (req, res) => {
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
};

exports.resetNickname = async (req, res) => {
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
};
