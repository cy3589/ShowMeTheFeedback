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
router.use("/projects", checkUserAccess, projectRouter);
router.use("/comments", checkUserAccess, commentRouter);
router.use("/users", checkUserAccess, userRouter);

module.exports = router;
