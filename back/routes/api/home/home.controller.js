const { User, Comment, Project } = require('../../../models');

module.exports = async function (req, res) {
  // 등록된 프로젝트
  // 피드백 갯수
  // 전체 회원수
  const users = await User.countDocuments();
  const comments = await Comment.countDocuments();
  const projects = await Project.countDocuments();

  res.status(200).json({
    users,
    comments,
    projects,
  });
};
