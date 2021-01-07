const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
     {
      clientID: "761091827197-87rfkiv1mj6vog1ec80u555pubbahss5.apps.googleusercontent.com",
      clientSecret: "hi8GMv0GxSGMtXXHbE-Q7nn5",
      callbackURL: "http://localhost:8080/users/auth/google/callback"
     },
     function(accessToken, refreshToken, profile, done) {
      var userData = {
       email: profile.emails[0].value,
       name: profile.displayName,
       token: accessToken
      };
      done(null, userData);
     }
    )
);