import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import strategy from 'passport-google-oauth20';
import config from '../config/config.js';
import { PROVIDER_LOGIN_CALLBACK_URL } from '../app/utils/constants.js';
import userUtil from '../app/utils/userUtils.js';
import logger from '../app/utils/logger.js';
const googleConf = config.get('oauth_google');
const GoogleStrategy = strategy.Strategy;

passport.use(new GoogleStrategy({
    clientID: googleConf.client_id,
    clientSecret: googleConf.client_secret,
    callbackURL: PROVIDER_LOGIN_CALLBACK_URL + 'google',
    scope: [ 'profile', 'email' ]
  }, async function verify(issuer, profile, user, next) {
    console.log("user===",user)
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

export default passport;