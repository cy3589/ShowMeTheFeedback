const { Router } = require('express');
const asyncHandler = require('../../../utils/asyncHandler');
const {
  getProjectList,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('./project.controller');

const router = Router();

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, 'uploads');
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname); //파일확장자추출(ex: .png)
    const basename = path.basename(file.originalname, ext); //ext를 제외한 파일 이름만 추출
    done(null, basename + '__' + new Date().getTime() + ext);
  },
});

const upload = multer({ storage: storage });

// 프로젝트 목록
router.get('/', asyncHandler(getProjectList));

// 프로젝트 읽기
router.get('/:projectId', asyncHandler(getProject));

// 프로젝트 생성
router.post('/', upload.array('image'), asyncHandler(createProject));

// 프로젝트 수정
router.put('/:projectId', asyncHandler(updateProject));

// 프로젝트 삭제
router.delete('/:projectId', asyncHandler(deleteProject));

module.exports = router;
