const { Router } = require("express");
const path = require("path");

const router = Router();
router.get("/*", (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) res.redirect("/");
  res.sendFile(path.join(__dirname + "/", "projects.html"));
});
router.get("/projects.css", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "projects.css"));
});
router.get("/projects.js", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "projects.js"));
});

module.exports = router;
