const { Router } = require("express");
const asyncHandler = require("../../../utils/asyncHandler");
const refresh = require("./refresh.controller");

const router = Router();

router.get("/", asyncHandler(refresh));

module.exports = router;
