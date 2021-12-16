const { Router } = require("express");
const path = require("path");

const router = Router();
let projectId = "";
router.get("/*", (req, res, next) => {
  projectId = req.params.projectId;
  console.log(req.params.projectId);
  res.sendFile(path.join(__dirname + "/", "index.html"));
  // res.sendFile(path.join(__dirname + "/", "index.js"));
  //   res.end("123");
});
router.get("/index.css", (req, res, next) => {
  projectId = req.params.projectId;
  console.log(req.params.projectId);
  res.sendFile(path.join(__dirname + "/", "index.css"));
  res.sendFile(path.join(__dirname + "/", "index.js"));
  //   res.end("123");
});
// router.get("/index.js", (req, res, next) => {
//   console.log(req);
//   res.send(`
//   const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
//   console.log(1)
//   wait(2000).then(()=>{console.log(2)});

//   `);
//   // res.sendFile(path.join(__dirname + "/", "index.js"));
//   //   res.end("123");
// });

module.exports = router;
// exports.projectId;
// exports.temp = "temp";
