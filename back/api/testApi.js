const { Router } = require("express");
const router = Router();

router.use("/dashBoard", (req, res, next) => {
  token = res.cookie("token", token);
});
module.exports = router;
