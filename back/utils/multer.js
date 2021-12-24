const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "uploads");
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    done(null, basename + "__" + new Date().getTime() + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
