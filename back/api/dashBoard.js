const { Router } = require("express");
const router = Router();
const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
router.use("/", async (req, res, next) => {
  const resData = {
    perProject: "6.8",
    totalProjects: "11",
    totalFeedback: "56",
  };
  await wait(1000);
  res.json(resData);
});
module.exports = router;
