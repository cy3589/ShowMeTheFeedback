const { Router } = require("express");
const path = require("path");
const router = Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "indexPage.html"));
});
router.get("/indexPage.css", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "indexPage.css"));
});
router.get("/indexPage.js", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/", "indexPage.js"));
});

module.exports = router;
