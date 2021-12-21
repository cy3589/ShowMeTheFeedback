const { Router } = require("express");
const { Comment, Project, User } = require("../models/index");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

// 댓글 읽기
router.get(
  "/:projectId",
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
  "/:projectId",
  asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { email, content, rating } = req.body;

    const comment = await Comment.create({
      projectId,
      author: email,
      content,
      rating,
    });

    await Project.findOneAndUpdate(
      { projectId },
      {
        $push: {
          comments: {
            comment,
          },
        },
      }
    ).populate("comments");

    await User.updateOne(
      { email },
      {
        $push: {
          comments: comment.commentId,
        },
      }
    );
    res.status(201).json({
      message: "댓글이 작성되었습니다.",
    });
  })
);

// 댓글 수정
// TODO: 코멘트 생성한 사람만 수정할 수 있도록 조정
router.put(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content, rating, email } = req.body;

    const comment = await Comment.findOne({ commentId });

    if (comment.author !== email) {
      res.status(404);
      throw new Error("수정 권한이 없습니다.");
    }

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

    res.status(201).json({
      message: "댓글이 수정되었습니다.",
    });
  })
);

// 댓글 삭제
// TODO: 코멘트 생성한 사람만 삭제할 수 있도록 조정
router.delete(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { email } = req.body;

    const comment = await Comment.findOne({ commentId });
    console.log(comment.author, email);
    if (comment.author !== email) {
      res.status(404);
      throw new Error("삭제 권한이 없습니다.");
    }

    const user = await User.findOne({ email });
    const project = await User.findOne({ author: user });
    await Comment.deleteOne({ commentId });

    user.comments = user.comments.filter((v) => v != commentId);
    project.comments = project.comments.filter((v) => v.commentId != commentId);

    user.save();
    project.save();

    res.status(200).json({
      message: "댓글이 삭제되었습니다.",
    });
  })
);

module.exports = router;
