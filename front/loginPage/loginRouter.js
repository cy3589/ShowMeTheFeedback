const { Router } = require("express");
const path = require("path");
const router = Router();
router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "login.html"));
});
router.get("/login.css", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "login.css"));
});
router.get("/login.js", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "login.js"));
});

module.exports = router;
