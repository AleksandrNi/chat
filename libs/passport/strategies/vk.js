const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
const User = require('../../../models/User');

module.exports = new VKStrategy({
    clientID: config.get('providers.vk.appId'),
    clientSecret: config.get('providers.vk.appSecret'),
    callbackURL: `http://localhost:3000/oauth/vkontakte`,
    scope: ['email'],
    profileFields: ['email'],
  }, async function(accessToken, refreshToken, params, profile, done) {
    const email = params.email;

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
