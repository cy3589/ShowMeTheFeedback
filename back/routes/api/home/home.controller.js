const { User, Comment, Project } = require("../../../models");

module.exports = async function (req, res) {
  const users = await User.countDocuments();
  const comments = await Comment.countDocuments();
  const projects = await Project.countDocuments();

  res.status(200).json({
    users,
    comments,
    projects,
  });
};
