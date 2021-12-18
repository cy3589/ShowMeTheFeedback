const { sign, verify, refreshVerify } = require("./jwt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const accessHeader = req.headers["access"];
  const refreshHeader = req.headers["refresh"];

  if (
    typeof accessHeader != "undefined" &&
    typeof refreshHeader != "undefined"
  ) {
    const accessToken = accessHeader;
    const refreshToken = refreshHeader;

    const accessResult = verify(accessToken);
    const decoded = await jwt.decode(accessToken);

    const refreshResult = refreshVerify(refreshToken);

    if (!accessResult.ok && accessResult.message == "jwt expired") {
      if (refreshResult.ok === false) {
        res.status(401);
        throw new Error("인증을 다시 받으세요");
      } else {
        const newAccessToken = sign(decoded.id);
        res.status(200).json({
          token: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(400);
      throw new Error("Access token이 만료되지 않았습니다.");
    }
  } else {
    res.status(400);
    throw new Error("토큰 값이 확인되지 않습니다.");
  }
};
