var GoogleStrategy = require("passport-google-oauth20").Strategy;
let passport = require("passport");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`,
      callbackURL: `${process.env.GOOGLE_OAUTH_REDIRECT_URL}`,
    },
    function (accessToken, refreshToken, profile, cb, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      // console.log(profile);
      return done(null, profile);
    }
  )
);
module.exports = passport;
