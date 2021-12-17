const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads폴더가 없으므로 생성합니다");
  fs.mkdirSync("uploads");
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); //파일확장자추출(ex: .png)
      const basename = path.basename(file.originalname, ext); //ext를 제외한 파일 이름만 추출
      done(null, basename + "__" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20메가바이트(20mb)
});

router.post("/", upload.array("thumbnails"), (req, res, next) => {
  // console.log(req);
  // fs.writeFile(req.body.thumnails[0], "my-file.png");
  //   console.log(req.headers);
  // console.log(req.files);
  console.log(req.body);
  res.json({ success: "false", projectId: "12312312" });
});
router.get("/", (req, res) => {
  console.log(req);
  res.json({ success: "false", projectId: "12312312" });
});
module.exports = router;
