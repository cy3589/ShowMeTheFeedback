const { Router } = require('express');
const { Comment, Project, User } = require('../models/index');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

// pagination
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

router.post(
  '/:projectId',
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email, content, rating } = req.body;
    const author = await User.findOne({ email });
    const project = await Project.findOne({ projectId });

    const comment = await Comment.create({
      projectId: project,
      author,
      content,
      rating,
    });

    await Project.updateOne(
      { projectId },
      {
        $push: {
          comments: {
            comment,
          },
        },
      }
    ).populate('comments');

    // TODO: comment 내용 들어가게하기
    // await Comment.populate(project.comments, {
    //   path: 'comments',
    // });
    res.json(project);
  })
);
router.put('/');
router.delete('/');

module.exports = router;
