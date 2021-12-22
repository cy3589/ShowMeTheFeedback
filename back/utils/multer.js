const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "uploads");
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname); //파일확장자추출(ex: .png)
    const basename = path.basename(file.originalname, ext); //ext를 제외한 파일 이름만 추출
    done(null, basename + "__" + new Date().getTime() + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
