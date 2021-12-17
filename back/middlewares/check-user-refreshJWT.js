const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = asyncHandler(async (req, res, next) => {
  const refreshHeader = req.headers["access"];

  if (typeof refreshHeader != "undefined") {
    const refreshToken = refreshHeader.split(" ")[1];
    const isAccessVerified = await jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!isAccessVerified) {
      res.status(401);
      throw new Error("인증 토큰이 유효하지 않습니다.");
    } else {
      res.json({
        status: 200,
      });
    }
    next();
  } else {
    res.send(403);
  }
});
