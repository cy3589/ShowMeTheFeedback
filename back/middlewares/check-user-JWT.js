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
        message: "인증에 실패했습니다. 다시 로그인 해주세요",
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
