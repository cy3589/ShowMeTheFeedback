const { Router } = require("express");
const router = Router();
const path = require("path");
router.get("/:filename", (req, res, next) => {
  const { filename } = req.params;
  const ext = filename?.split(".")[filename?.split(".").length - 1];
  if (ext === "js") {
    res.setHeader("Content-Type", "application/javascript");
    res.sendFile(path.join(__dirname, `/${filename}`));
    return;
  }
  if (ext === "css") {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, `/${filename}`));
    return;
  }
  if (ext === "json") {
    res.setHeader("Content-Type", "application/json");
    res.sendFile(path.join(__dirname, `/${filename}`));
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "/index.html"));
});

// router.get("/", (req, res, next) => {
//   res.json({ message: "projectID가 없습니다" });
//   // res.send("projectID가 없습니다");
//   return;
// });

module.exports = router;
