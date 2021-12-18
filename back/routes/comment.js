const { Router } = require('express');
const { Comment, Project, User } = require('../models/index');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

// 댓글 읽기
router.get(
  '/:projectId',
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId });

    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const [comments, totalPage] = await Comment.getPaginatedComments(
      { projectId: project },
      page,
      perPage
    );

    res.json({ comments, page, perPage, totalPage });
  })
);

// 댓글 작성
router.post(
  '/:projectId',
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email, content, rating } = req.body;
    const author = await User.findOne({ email });

    const comment = await Comment.create({
      projectId,
      author,
      content,
      rating,
    });

    const project = await Project.findOneAndUpdate(
      { projectId },
      {
        $push: {
          comments: {
            comment,
          },
        },
      }
    ).populate('comments');

    res.json(project);
  })
);

// 댓글 수정
router.put(
  '/:commentId',
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content, rating } = req.body;

    await Comment.updateOne(
      {
        commentId,
      },
      {
        $set: {
          content,
          rating,
        },
      }
    );
    const comment = await Comment.findOne({ commentId });

    res.status(201).json({
      comment,
    });
  })
);

// 댓글 삭제
router.delete(
  '/:commentId',
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    await Comment.deleteOne({ commentId });
    res.status(204).json({
      message: '댓글이 삭제되었습니다.',
    });
  })
);

module.exports = router;
