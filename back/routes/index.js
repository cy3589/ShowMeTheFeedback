const { Router } = require("express");
const checkUserAccess = require("../middlewares/check-user-JWT");
const authRouter = require("./api/auth");
const projectRouter = require("./api/project");
const commentRouter = require("./api/comment");
const refreshRouter = require("./api/refresh");
const userRouter = require("./api/user");

const router = Router();

router.use("/auth", authRouter);
router.use("/refresh", refreshRouter);
router.use("/project", checkUserAccess, projectRouter);
router.use("/comment", checkUserAccess, commentRouter);
router.use("/user", checkUserAccess, userRouter);

module.exports = router;
