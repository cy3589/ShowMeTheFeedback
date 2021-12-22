var GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_SECRET_ID,
    clientSecret: process.env.GOOGLE_SECRET_PASSWORD,
    callbackURL: "http://localhost:5000/auth/google/secrets",
  },
  function (accessToken, refreshToken, profile, cb) {
    const email = profile._json.email;
    return cb(null, profile);
  }
);
