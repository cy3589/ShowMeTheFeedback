const mongoose = require("mongoose");

const CommentSchema = require("./schemas/comment");
const ProjectSchema = require("./schemas/project");
const UserSchema = require("./schemas/user");
const ContentSchema = require("./schemas/content");
const TempUserSchema = require("./schemas/tempUser");

module.exports = {
  User: mongoose.model("User", UserSchema),
  Project: mongoose.model("Project", ProjectSchema),
  Comment: mongoose.model("Comment", CommentSchema),
  Content: mongoose.model("Content", ContentSchema),
  TempUser: mongoose.model("TempUser", TempUserSchema),
};
