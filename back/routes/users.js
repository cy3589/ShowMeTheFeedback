const { Router } = require("express");
const refresh = require("../utils/refresh");

const router = Router();

router.get("/", (req, res) => {
  console.log("object");
});

router.get("/refresh", refresh);

module.exports = router;
