const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const {
  getProjectList,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("./project.controller");

const router = Router();

// 프로젝트 목록
router.get("/", asyncHandler(getProjectList));

// 프로젝트 읽기
router.get("/:projectId", asyncHandler(getProject));

// 프로젝트 생성
router.post("/", asyncHandler(createProject));

// 프로젝트 수정
router.put("/:projectId", asyncHandler(updateProject));

// 프로젝트 삭제
router.delete("/:projectId", asyncHandler(deleteProject));

module.exports = router;
