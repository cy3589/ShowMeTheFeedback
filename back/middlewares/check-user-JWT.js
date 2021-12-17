const { verify } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const accessHeader = req.headers["access"];

  if (typeof accessHeader != "undefined") {
    const accessToken = accessHeader.split(" ")[1];
    const isVerified = verify(accessToken);
    if (isVerified.ok) {
      req.email = isVerified.id;
      next();
    } else {
      res.status(401).json({
        message: "인증에 실패했습니다. ",
      });
    }
  }
};
