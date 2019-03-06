const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');
const User = require('../../../models/User');

module.exports = new FacebookStrategy({
    clientID: config.get('providers.facebook.appId'),
    clientSecret: config.get('providers.facebook.appSecret'),
    callbackURL: `http://localhost:3000/oauth/facebook`,
    profileFields: ['displayName', 'email'],
  }, async function(accessToken, refreshToken, profile, done) {
    if (!profile.emails || !profile.emails.length) {
      return done(null, false, {message: 'Нет email!'});
    }
    const email = profile.emails[0].value;

    try {
      let user = await User.findOne({email});

      if (user) {
        return done(null, user, { message: 'Добро пожаловать!' });
      }

      user = await User.create({
        email,
        displayName: profile.displayName,
      });
      done(null, user, { message: 'Добро пожаловать!' });
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);
