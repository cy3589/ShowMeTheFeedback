const bcrypt = require("bcrypt");
const { User, Project } = require("../../../models");
const { passwordValidation } = require("../../../utils/validation");

exports.getMyProjects = async (req, res) => {
  const { email } = req;

  const user = await User.findOne({ email });

  const projects = await Project.find({ author: user }).populate("author");

  const result = projects.map((project) => {
    return {
      projectName: project.projectName,
      author: project.author.nickname,
      thumbnails: project.thumbnails,
      averageRating: project.averageRating,
      createdAt: project.createdAt,
      projectId: project.projectId,
    };
  });

  res.status(200).json(result);
};

exports.getMyAccount = async (req, res) => {
  const { email } = req;

  const user = await User.findOne({ email });

  res.status(200).json({
    email,
    nickname: user.nickname,
  });
};

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  const { email } = req;

  passwordValidation(password);

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
  const { changeNickname } = req.body;

  const { email } = req;

  const user = await User.findOne({ nickname: changeNickname });
  if (user) {
    res.status(400).json({
      message: "이미 존재하는 닉네임입니다.",
    });
  } else {
    await User.updateOne(
      { email },
      {
        $set: {
          nickname: changeNickname,
        },
      }
    );
    res.status(201).json({
      message: "닉네임이 성공적으로 변경되었습니다.",
    });
    return;
  }
};
