const { Router } = require("express");
const path = require("path");
const router = Router();
// router.get("/", (req, res, next) => {
//   res.sendFile(path.join(__dirname + "/", "login.html"));
// });
// router.get("/login.css", (req, res, next) => {
//   res.sendFile(path.join(__dirname + "/", "login.css"));
// });
// router.get("/login.js", (req, res, next) => {
//   res.sendFile(path.join(__dirname + "/", "login.js"));
// });
router.get("/", (req, res, next) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).send("로그아웃 frontEND서버 응답 입니다, token삭제 확인요망");
});

module.exports = router;
