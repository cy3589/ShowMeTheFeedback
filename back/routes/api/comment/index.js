const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("./comment.controller.js");

const router = Router();

// 댓글 읽기
router.get("/:projectId", asyncHandler(getComment));

// 댓글 작성
router.post("/:projectId", asyncHandler(createComment));

// 댓글 수정
// TODO: 코멘트 생성한 사람만 수정할 수 있도록 조정
router.put("/:commentId", asyncHandler(updateComment));

// 댓글 삭제
// TODO: 코멘트 생성한 사람만 삭제할 수 있도록 조정
router.delete("/:commentId", asyncHandler(deleteComment));

module.exports = router;
