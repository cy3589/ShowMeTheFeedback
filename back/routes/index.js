const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.get(
  "/",
  asyncHandler((req, res) => {
    res.json({
      message: "테스트~",
    });
  })
);

module.exports = router;
