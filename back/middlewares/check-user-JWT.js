const { verify } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const accessHeader = req.headers["access"];

  if (typeof accessHeader != "undefined") {
    const accessToken = accessHeader;
    const isVerified = verify(accessToken);
    if (isVerified.ok) {
      req.email = isVerified.id;
      next();
    } else {
      res.status(401).json({
        message:
          "accessToken 인증에 실패했습니다. accessToken을 재발급 받으세요",
      });
      return;
    }
  } else {
    res.status(401).json({
      message: "인증에 실패했습니다. ",
    });
    return;
  }
};
