const { Router } = require('express');
const asyncHandler = require('../../../utils/asyncHandler');
const getLandingInfo = require('./home.controller.js');

const router = Router();

router.get('/', asyncHandler(getLandingInfo));

module.exports = router;
