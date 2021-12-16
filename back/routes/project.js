const { Router } = require("express");
const { Project, Content, User } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  const projects = await Project.find({})
    .populate("author")
    .populate("contents");
  const tmp = projects.map((v) => {
    return {
      author: v.author.nickname,
      title: v.title,
      image: v.image,
      averageRating: v.averageRating,
      createdAt: v.createdAt,
      projectId: v.projectId,
    };
  });
  res.status(200).json({
    contents: tmp,
  });
});

router.post("/", async (req, res) => {
  const { email, title, description, stack, members, image } = req.body;

  const author = await User.findOne({ email });

  const content = await Content.create({
    title,
    description,
    stack,
  });
  // TODO: 에러핸들러
  await Project.create({
    author,
    title,
    image: image ?? " ",
    members: members ?? " ",
    contents: content,
  });

  res.status(201).json({
    message: "프로젝트를 생성했습니다.",
  });
});

module.exports = router;
