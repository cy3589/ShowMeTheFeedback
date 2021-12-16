const { User } = require("../models");

module.exports = async (req, res, next) => {
  let bearerToken;
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(".");
    bearerToken = bearer[1]; // payload
    req.token = bearerToken;
    await User.findOne({ token: req.token }, (err, user) => {
      if (err) {
        res.json({
          status: 400,
          data: "Error occured: " + err,
        });
      } else {
        res.json({
          status: 200,
          data: user,
        });
      }
    });
    next();
  } else {
    res.send(403);
  }
};
