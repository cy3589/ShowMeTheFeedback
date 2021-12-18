const { Router } = require("express");
const router = Router();
const dashBoard = require("./dashBoard.js");
const myData = require("./myData");
const postProject = require("./postProject");
router.use("/dashBoard", dashBoard);
router.use("/myData", myData);
router.use("/post/project", postProject);
module.exports = router;
