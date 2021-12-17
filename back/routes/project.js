const { Router } = require('express');
const { Project, Content, User, Image } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await Project.find({})
      .populate('author')
      .populate('contents');
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
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, title, description, stack, members, image } = req.body;

    const author = await User.findOne({ email }); // 사용자 확인
    const content = await Content.create({
      description,
      stack,
      members: members ?? ' ',
    });

    const project = await Project.create({
      author,
      title,
      image: image ?? ' ',
      contents: content,
    });

    // TODO: 이미지 저장 imgbb 사용 여부

    res.status(201).json({
      message: '프로젝트를 생성했습니다.',
    });
  })
);

router.put(
  '/:projectId',
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email, title, description, stack, members, image } = req.body;

    const project = await Project.findOne({ projectId });

    await content.updateOne(
      { project },
      {
        $set: {
          members,
          description,
          stack,
        },
      }
    );

    await Project.updateOne(
      { projectId },
      {
        $set: {
          title,
          image: image ?? ' ',
          contents: content,
        },
      }
    );
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId });
  })
);

module.exports = router;
