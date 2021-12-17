const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = asyncHandler(async (req, res, next) => {
  const accessHeader = req.headers["access"];

  if (typeof accessHeader != "undefined") {
    const accessToken = accessHeader.split(" ")[1];
    const isAccessVerified = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!isAccessVerified) {
      const refreshHeader = req.headers["refresh"];

      if (refreshHeader) {
        const refreshToken = refreshHeader.split(" ")[1];

        const isRefreshVerified = await jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (isRefreshVerified) {
        }
      }
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
