const { Router } = require("express");
const path = require("path");
const router = Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "createProject.html"));
});
router.get("/createProject.css", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "createProject.css"));
});
router.get("/:jsFileName", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", req.params.jsFileName));
});

module.exports = router;
