const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  getMyAccount,
  resetPassword,
  resetNickname,
} = require("./user.controller");

const router = Router();

router.get("/my-account", getMyAccount);
router.post("/reset-password", asyncHandler(resetPassword));
router.post("/reset-password", asyncHandler(resetPassword));
router.post("/reset-nickname", asyncHandler(resetNickname));

module.exports = router;
