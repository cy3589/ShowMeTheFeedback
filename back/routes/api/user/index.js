const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const { resetPassword, resetNickname } = require("./user.controller");

const router = Router();

router.post("/reset-password", asyncHandler(resetPassword));
router.post("/reset-nickname", asyncHandler(resetNickname));

module.exports = router;
