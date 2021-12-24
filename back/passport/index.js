const passport = require("passport");

const google = require("./strategies/google");

module.exports = () => {
  passport.use(google);
};
