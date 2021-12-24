const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const {
  getMyAccount,
  getMyProjects,
  resetPassword,
  resetNickname,
} = require("./user.controller");

const router = Router();

router.get("/my-account", asyncHandler(getMyAccount));
router.get("/my-projects", asyncHandler(getMyProjects));
router.post("/reset-password", asyncHandler(resetPassword));
router.post("/reset-password", asyncHandler(resetPassword));
router.post("/reset-nickname", asyncHandler(resetNickname));

module.exports = router;
