const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const logger = require('../utils/logger');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile', 'email' ]
  }, async function verify(issuer, profile, user, next) {
    if(!user || !user.id) return next("Google Auth Fail");

    let email = user.emails && user.emails[0] && user.emails[0].value; 
    let userExist = await User.findOne({providerId: user.id, status: 1})
    if(!userExist) {
      const newUser = new User({email, provider: user.provider, providerId: user.id, type: 2, role: "normal", created: Date.now(), status: 1});
      await newUser.save();
    }
    let userInf = {email, providerId: user.id};

    logger.info("USER LOGGED IN THROUGH GOOGLE: ---- ",userInf);
    next(null, userInf);
}));