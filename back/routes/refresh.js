const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const refresh = require("../utils/refresh");

const router = Router();

router.get("/", asyncHandler(refresh));

module.exports = router;
