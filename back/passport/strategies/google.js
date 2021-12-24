var GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models/index");
const generateRandomPassword = require("../../utils/randomPassword");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_SECRET_ID,
    clientSecret: process.env.GOOGLE_SECRET_PASSWORD,
    callbackURL:
      "http://elice-kdt-sw-1st-vm05.koreacentral.cloudapp.azure.com:5000/auth/google/secrets",
  },
  async function (accessToken, refreshToken, profile, cb) {
    const email = profile._json.email;
    const name = profile._json.name;

    const userInfo = {
      userEmail: email,
    };

    const user = await User.findOne({ email });

    if (!user) {
      await User.create({
        email,
        nickname: name,
        password: generateRandomPassword(),
        google: true,
      });
    }

    return cb(null, userInfo);
  }
);
