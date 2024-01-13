const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleConf = require('../config/config').get('oauth_google');
const { PROVIDER_LOGIN_CALLBACK_URL } = require('../app/utils/constants');
const userUtil = require('../app/utils/userUtils');
const logger = require('../app/utils/logger');

passport.use(new GoogleStrategy({
    clientID: googleConf.client_id,
    clientSecret: googleConf.client_secret,
    callbackURL: PROVIDER_LOGIN_CALLBACK_URL + 'google',
    scope: [ 'profile', 'email' ]
  }, async function verify(issuer, profile, user, next) {
    if(!user || !user.id) return next("Google Auth Fail");

    let email = user.emails && user.emails[0] && user.emails[0].value; 

    let userExist = await userUtil.getUser({providerId: user.id, status: 1});
    if(!userExist) {
      await userUtil.createUser({email, provider: user.provider, providerId: user.id, type: 2, role: "normal", created: Date.now(), status: 1});
    }
    let userInf = {email, providerId: user.id};

    logger.info("USER LOGGED IN THROUGH GOOGLE: ---- ",userInf);
    next(null, userInf);
}));

module.exports = passport;