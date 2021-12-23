const { Comment, Project, User } = require("../../../models");

exports.getComment = async (req, res) => {
  const { projectId } = req.params;
  // 페이지 네이션을 위한 작업
  // const page = Number(req.query.page || 1);
  // const perPage = Number(req.query.perPage || 10);

  // const [comments, totalPage] = await Comment.getPaginatedComments(
  //   { projectId },
  //   page,
  //   perPage
  // );

  // res.status(200).json({ comments, page, perPage, totalPage });

  const rawComments = await Comment.find({ projectId }).populate("author");

  const comments = rawComments.map((comment) => {
    {
      return {
        commentId: comment.commentId,
        author: comment.author.nickname,
        content: comment.content,
        rating: comment.rating,
        createdAt: comment.createdAt,
      };
    }
  });

  res.status(200).json({ comments });
};

exports.createComment = async (req, res) => {
  const { projectId } = req.params;
  const { content, rating } = req.body;
  const { email } = req;

  const user = await User.findOne({ email });

  const comment = await Comment.create({
    projectId,
    author: user,
    content,
    rating,
  });

  const comments = await Comment.find({ projectId });
  const ratingSum = comments.reduce((acc, cur) => acc + cur.rating, 0);

  const newAverageRating = Number((ratingSum / comments.length).toFixed(2));

  await Project.updateOne(
    { projectId },
    {
      $push: {
        comments: {
          comment,
        },
      },
      $set: {
        averageRating: newAverageRating,
      },
    }
  );

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
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { content, rating } = req.body;
  const { email } = req;
  const comment = await Comment.findOne({ commentId }).populate("author");

  if (comment.author.email !== email) {
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

  const comments = await Comment.find({ projectId: comment.projectId });
  const ratingSum = comments.reduce((acc, cur) => acc + cur.rating, 0);

  const newAverageRating = Number((ratingSum / comments.length).toFixed(2));

  await Project.updateOne(
    { projectId: comment.projectId },
    {
      $push: {
        comments: {
          comment,
        },
      },
      $set: {
        averageRating: newAverageRating,
      },
    }
  );

  res.status(201).json({
    message: "댓글이 수정되었습니다.",
  });
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { email } = req;

  const comment = await Comment.findOne({ commentId }).populate("author");
  if (comment.author.email !== email) {
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
};
